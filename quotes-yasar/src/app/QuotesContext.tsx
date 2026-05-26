'use client';


import React, { createContext, useState, useEffect } from 'react'; 
import { quotes as initialQuotes, Quote } from './quotes'; 
import { getRandomNumber } from '../helperfunctions/helperfunctions';

interface QuotesContextType {
  quotes: Quote[];
  quoteIndex: number;
  handleQuoteIndexUpdate: () => void;
  handleLikeQuote: () => void;
  handleUnlikeQuote: (quoteIdToUnlike: number) => void;
}

export const QuotesContext = createContext<QuotesContextType>({} as QuotesContextType);

interface QuotesContextProviderProps {
  children: React.ReactNode;
}

export function QuotesContextProvider({ children }: QuotesContextProviderProps) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);


  useEffect(() => {
    const savedQuotes = localStorage.getItem('mySavedQuotes');
    
    if (savedQuotes) {
      setQuotes(JSON.parse(savedQuotes));
    }
  }, []);
  // -------------------------------------------------------------

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
    
    localStorage.setItem('mySavedQuotes', JSON.stringify(updatedQuotes));
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
    
    localStorage.setItem('mySavedQuotes', JSON.stringify(updatedQuotes));
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