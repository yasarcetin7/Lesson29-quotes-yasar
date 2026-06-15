import { getDb, Collections } from "@/lib/db";
import { ObjectId } from "mongodb";
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/Button";

export default async function EditQuotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const quoteId = resolvedParams.id;

  // 1. GÜVENLİK: Kullanıcı giriş yapmış mı?
  const session = await auth0.getSession();
  if (!session?.user) redirect("/auth/login");

  // 2. VERİ ÇEKME: Artık params.id yerine quoteId kullanıyoruz
  const db = await getDb();
  const quote = await db
    .collection(Collections.quotes)
    .findOne({ _id: new ObjectId(quoteId) });

  if (!quote) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        Quote not found.
      </div>
    );
  }

  // 3. YETKİ KONTROLÜ: Sözü düzenlemek isteyen kişi, sözün sahibi mi?
  if (quote.createdBy !== session.user.sub) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p className="text-xl font-bold text-error">
          Unauthorized: You can only edit your own quotes.
        </p>
        <Link href="/" className="btn btn-primary">
          Go Back Home
        </Link>
      </div>
    );
  }

  // 4. GÜNCELLEME FONKSİYONU (Server Action)
  async function updateQuote(formData: FormData) {
    "use server";

    const currentSession = await auth0.getSession();
    if (!currentSession?.user) return;

    const updatedText = String(formData.get("quote") ?? "");
    const updatedAuthor = String(formData.get("author") ?? "");

    const db = await getDb();
    await db
      .collection(Collections.quotes)
      .updateOne(
        { _id: new ObjectId(quoteId), createdBy: currentSession.user.sub },
        {
          $set: {
            quote: updatedText,
            author: updatedAuthor,
            updatedAt: new Date(),
          },
        },
      );

    redirect("/");
  }

  // 5. ÖN YÜZ (Kullanıcının göreceği Düzenleme Formu)
  return (
    <main className="min-h-screen flex items-center justify-center bg-base-200 px-5">
      <form
        action={updateQuote}
        className="bg-base-100 p-8 md:p-10 rounded-md shadow-xl flex flex-col gap-6 w-full max-w-lg border border-base-content/20"
      >
        <h2 className="text-2xl font-bold text-center text-primary">
          Edit Your Quote
        </h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="author" className="font-semibold">
            Author
          </label>
          <input
            type="text"
            name="author"
            id="author"
            required
            defaultValue={quote.author}
            className="input input-bordered"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="quote" className="font-semibold">
            Quote Text
          </label>
          <textarea
            name="quote"
            id="quote"
            required
            defaultValue={quote.quote}
            className="textarea textarea-bordered h-28 resize-none text-base"
          />
        </div>

          <div className="mt-4 md:mt-4 flex flex-col">
            <Button type="submit" variant={"primary"} className="w-full">
              Save Changes
            </Button>

            <div className="mt-4 md:mt-4 flex flex-col">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center py-2 text-sm font-semibold bg-slate-300/90 text-slate-700 hover:opacity-70 rounded-md transition-colors"
          >
            Cancel
          </Link>
          </div>
        </div>
      </form>
    </main>
  );
}
