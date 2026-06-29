"use server";

import { auth0 } from "@/lib/auth0";
import { Collections, getDb } from "@/lib/db";
import { newQuoteSchema, AddNewQuoteState } from "@/types/quotes";
import { ObjectId } from "mongodb";

export async function addNewQuote(
  _currentState: AddNewQuoteState,
  formData: FormData,
): Promise<AddNewQuoteState> {
  const session = await auth0.getSession();

  if (!session) {
    return {
      success: false,
      message: "Please log in to add a quote.",
    };
  }

  const rawData = {
    author: String(formData.get("author") ?? ""),
    quote: String(formData.get("quote") ?? ""),
    category: String(formData.get("category") ?? ""),
  };

  const validationOutput = newQuoteSchema.safeParse(rawData);

  if (!validationOutput.success) {
    const validationErrors = validationOutput.error.flatten(); // z.flattenError yerine doğrudan objeden flatten() çağırabilirsin
    console.log("validationErrors", validationErrors);

    return {
      success: false,
      errors: validationErrors,
      data: rawData,
    };
  } else {
    const db = await getDb();
    const col = db.collection(Collections.quotes);
    const now = new Date();

    const newQuote = {
      quote: validationOutput.data.quote,
      author: validationOutput.data.author,
      category: validationOutput.data.category,
      createdBy: session.user.sub,
      adminApproved: false,
      createdAt: now,
      updatedAt: now,
    };

    const newDoc = await col.insertOne(newQuote);
    console.log("newDoc", newDoc);

    return {
      success: true,
    };
  }
}

export async function deleteQuoteAction(quoteId: string) {
  const session = await auth0.getSession();

  if (!session?.user) {
    throw new Error("You must be logged in to delete a quote.");
  }

  const db = await getDb();
  const col = db.collection(Collections.quotes);

  const quote = await col.findOne({ _id: new ObjectId(quoteId) });
  if (!quote) {
    throw new Error("Quote not found.");
  }

  if (quote.createdBy !== session.user.sub) {
    throw new Error("Unauthorized: You can only delete your own quotes.");
  }
  await col.deleteOne({ _id: new ObjectId(quoteId) });

  return { success: true };
}
