'use server';

import { auth0 } from '@/lib/auth0';
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
    // TODO: connect to DB to save the data
    return {
      success: true,
    };
  }
}