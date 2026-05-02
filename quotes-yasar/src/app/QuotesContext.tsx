'use client';

import React, { createContext, useState } from 'react';
import { quotes as initialQuotes, Quote } from './quotes'; // Quote tipini de içeri alıyoruz (Dosya yolunu projene göre ayarlayabilirsin)
import { getRandomNumber } from '../helperfunctions/helperfunctions';

// 1. Context'in içinde neler olacağını sözleşme ile belirliyoruz
interface QuotesContextType {
  quotes: Quote[];
  quoteIndex: number;
  handleQuoteIndexUpdate: () => void;
  handleLikeQuote: () => void;
  handleUnlikeQuote: (quoteIdToUnlike: number) => void;
}

// 2. createContext'e bu sözleşmeyi uyguluyoruz ({} as QuotesContextType ile boş başlasa da hata vermesini engelliyoruz)
export const QuotesContext = createContext<QuotesContextType>({} as QuotesContextType);

// 3. Provider bileşeninin proplarını tanımlıyoruz
interface QuotesContextProviderProps {
  children: React.ReactNode;
}

export function QuotesContextProvider({ children }: QuotesContextProviderProps) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);

  function handleQuoteIndexUpdate() {
    const nextIndex = getRandomNumber(0, quotes.length - 1);
    setQuoteIndex(nextIndex);
  }

  function handleLikeQuote() {
    const updatedQuotes = quotes.map((quote, id) => {
      if (id === quoteIndex) {
        const currentLikes = typeof quote.likeCount === 'number' ? quote.likeCount : 0;
        if (quote.isLiked) {
          return { ...quote, likeCount: currentLikes - 1, isLiked: false };
        }
        return { ...quote, likeCount: currentLikes + 1, isLiked: true };
      }
      return quote;
    });
    setQuotes(updatedQuotes);
  }

  function handleUnlikeQuote(quoteIdToUnlike: number) {
    const updatedQuotes = quotes.map((quote, id) => {
      if (id === quoteIdToUnlike) {
        const currentLikes = typeof quote.likeCount === 'number' ? quote.likeCount : 1;
        return { ...quote, likeCount: currentLikes - 1, isLiked: false };
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