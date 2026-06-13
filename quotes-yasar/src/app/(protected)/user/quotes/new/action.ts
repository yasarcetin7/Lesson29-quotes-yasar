'use server';

import { auth0 } from '@/lib/auth0';
import { Collections, getDb } from '@/lib/db';
import { newQuoteSchema, AddNewQuoteState } from '@/types/quotes';


export async function addNewQuote(
  _currentState: AddNewQuoteState,
  formData: FormData,
): Promise<AddNewQuoteState> {
  const session = await auth0.getSession();

  if (!session) {
    return {
      success: false,
      message: 'Please log in to add a quote.',
    };
  }

  const rawData = {
    author: String(formData.get('author') ?? ''),
    quote: String(formData.get('quote') ?? ''),
    category: formData.getAll('category').map((item) => String(item)),
  };

  const validationOutput = newQuoteSchema.safeParse(rawData);
  
  if (!validationOutput.success) {
    const validationErrors = validationOutput.error.flatten(); // z.flattenError yerine doğrudan objeden flatten() çağırabilirsin
    console.log('validationErrors', validationErrors);

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
      createdBy: session.user.sub, // @Anna To find right docs page in Auth0
      adminApproved: false,
      createdAt: now,
      updatedAt: now
    }

    const newDoc = await col.insertOne(newQuote);
    console.log('newDoc', newDoc);

    return {
      success: true,
    };
  }
}