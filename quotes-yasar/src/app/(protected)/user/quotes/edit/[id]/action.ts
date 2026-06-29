"use server";

import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import { getDb, Collections } from "@/lib/db";

// DİKKAT: Araya 'prevState: any' parametresi eklendi
export async function updateQuote(quoteId: string, prevState: any, formData: FormData) {
  const currentSession = await auth0.getSession();
  if (!currentSession?.user) return { error: "Yetkisiz işlem." };

  const updatedText = String(formData.get("quote") ?? "").trim();
  const updatedAuthor = String(formData.get("author") ?? "").trim();

  // 1. DOĞRULAMA: Hataları ekrana (UI) gönder
  if (updatedText === "" || updatedAuthor === "") {
    return { error: "Hata: Yazar ve söz alanları boş bırakılamaz!" };
  }

  if (updatedText.length < 3) {
    return { error: "Hata: Söz en az 3 karakter olmalıdır!" };
  }

  // 2. DOĞRULAMAYI GEÇTİYSE KAYDET
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
      }
    );

  redirect("/");
}