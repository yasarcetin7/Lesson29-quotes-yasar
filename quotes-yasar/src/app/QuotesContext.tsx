'use client';

import React, { createContext, useState, useEffect } from 'react'; 
import { quotes as initialQuotes, Quote } from './quotes'; 
import { getRandomNumber } from '../helperfunctions/helperfunctions';
import { useUser } from '@auth0/nextjs-auth0/client';

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
  
  const { user } = useUser();

  // 1. Fetch saved quotes from LocalStorage on mount
  useEffect(() => {
    const savedQuotes = localStorage.getItem('mySavedQuotes');
    if (savedQuotes) {
      setQuotes(JSON.parse(savedQuotes));
    }
  }, []);

  // 2. Sync guest likes to the authenticated user's account
  useEffect(() => {
    if (user?.sub) {
      setQuotes((currentQuotes) => {
        let hasChanges = false;

        const syncedQuotes = currentQuotes.map((quote) => {
          // If this quote was liked by a guest
          if (quote.likedBy.includes("guest")) {
            hasChanges = true;
            
            // Remove "guest" tag
            const updatedLikedBy = quote.likedBy.filter((id) => id !== "guest");
            
            // Add the actual user ID (if not already added)
            if (!updatedLikedBy.includes(user.sub as string)) {
              updatedLikedBy.push(user.sub as string);
            }
            
            return { ...quote, likedBy: updatedLikedBy };
          }
          return quote;
        });

        // Save and return if there are any synchronized quotes
        if (hasChanges) {
          localStorage.setItem('mySavedQuotes', JSON.stringify(syncedQuotes));
          return syncedQuotes;
        }

        // If no changes, return the list as is
        return currentQuotes;
      });
    }
  }, [user?.sub]);

  // -------------------------------------------------------------

  function handleQuoteIndexUpdate() {
    const nextIndex = getRandomNumber(0, quotes.length - 1);
    setQuoteIndex(nextIndex);
  }

  function handleLikeQuote() {
    const userId = user?.sub || "guest";

    const updatedQuotes = quotes.map((quote, id) => {
      if (id === quoteIndex) {
        // If the user's ID is already in the list (Already liked)
        if (quote.likedBy.includes(userId)) {
          // Remove from list (Unlike)
          return { ...quote, likedBy: quote.likedBy.filter(sub => sub !== userId) };
        } else {
          // Add to list (Like)
          return { ...quote, likedBy: [...quote.likedBy, userId] };
        }
      }
      return quote;
    });
    
    setQuotes(updatedQuotes);
    localStorage.setItem('mySavedQuotes', JSON.stringify(updatedQuotes));
  }

  function handleUnlikeQuote(quoteIdToUnlike: number) {
    const userId = user?.sub || "guest";

    const updatedQuotes = quotes.map((quote, id) => {
      if (id === quoteIdToUnlike) {
         // Remove the user's ID from the liked list
        return { ...quote, likedBy: quote.likedBy.filter(sub => sub !== userId) };
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