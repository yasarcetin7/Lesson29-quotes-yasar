'use client';
import { createContext, useState } from 'react';
import { quotes as initialQuotes } from '@/app/quotes';
import { getRandomNumber } from '../helperfunctions/helperfunctions';

export const QuotesContext = createContext({});

export function QuotesContextProvider({ children }) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quotes, setQuotes] = useState(initialQuotes);

  function handleQuoteIndexUpdate() {
    const nextIndex = getRandomNumber(0, quotes.length - 1);
    setQuoteIndex(nextIndex);
  }
  // Like function
  function handleLikeQuote() {
    const updatedQuotes = quotes.map((quote, id) => {
      if (id === quoteIndex) {
        const currentLikes = typeof quote.likedBy === 'number' ? quote.likedBy : 0;
        return { ...quote, likedBy: currentLikes + 1, isLiked: true };
      }
      return quote;
    });

    setQuotes(updatedQuotes);
  }
  // Unlike function
  function handleUnlikeQuote(quoteIdToUnlike) {
    const updatedQuotes = quotes.map((quote, id) => {
      if (id === quoteIdToUnlike) {
        // DÜZELTME: ++ operatörü kaldırıldı
        const currentLikes = typeof quote.likedBy === 'number' ? quote.likedBy : 1;
        return { ...quote, likedBy: currentLikes - 1, isLiked: false };
      }
      return quote;
    });

    setQuotes(updatedQuotes);
  }

  return (
    <QuotesContext.Provider
      value={{
        quotes,
        quoteIndex,
        handleQuoteIndexUpdate,
        handleLikeQuote,
        handleUnlikeQuote  
      }}
    >
      {children}
    </QuotesContext.Provider>
  );
}