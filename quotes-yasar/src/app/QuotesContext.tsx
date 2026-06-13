"use client";

import React, { createContext, useState, useEffect } from "react";
// initialQuotes'u sildik çünkü artık veritabanı kullanıyoruz.
import { Quote } from "../utils/quotes"; 
import { getRandomNumber } from "../utils/helperfunctions";
import { useUser } from "@auth0/nextjs-auth0/client";

interface QuotesContextType {
  quotes: Quote[];
  quoteIndex: number;
  isLoading: boolean;
  error: string | null;
  handleQuoteIndexUpdate: () => void;
  handleLikeQuote: () => void;
  handleUnlikeQuote: (quoteIdToUnlike: number) => void;
}

export const QuotesContext = createContext<QuotesContextType>(
  {} as QuotesContextType,
);

export function QuotesContextProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // TÜM VERİ ÇEKME İŞLEMİ TEK BİR YERDE TOPLANDI
  useEffect(() => {
    async function fetchQuotes() {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch("/api/quotes");
        
        if (!response.ok) {
          throw new Error("Failed to load quotes");
        }
        
        const data = await response.json();
        
        // API doğrudan bir dizi (array) döndürdüğü için direkt data'yı kullanıyoruz.
        // Eğer veritabanından geçerli bir dizi geldiyse onu state'e at.
        if (Array.isArray(data) && data.length > 0) {
          setQuotes(data);
        } else {
          setQuotes([]); // Veri yoksa listeyi boşalt
        }
        
      } catch (err) {
        console.error("Veri çekilirken hata:", err);
        setError(err instanceof Error ? err.message : "Sözler yüklenemedi.");
        setQuotes([]);
      } finally {
        // Hata da olsa başarılı da olsa loading ekranını kapat!
        setIsLoading(false);
      }
    }

    fetchQuotes(); // Fonksiyonu çağırmayı unutmuyoruz
  }, []); // Sadece bileşen ilk yüklendiğinde çalışması için boş dizi

  function handleQuoteIndexUpdate() {
    if (quotes.length === 0) return; // Liste boşsa çökmesini engelle
    const nextIndex = getRandomNumber(0, quotes.length - 1);
    setQuoteIndex(nextIndex);
  }

  function handleLikeQuote() {
    const updatedQuotes = quotes.map((quote, id) => {
      if (id === quoteIndex) {
        const currentLikes = typeof quote.likeCount === "number" ? quote.likeCount : 0;
        if (quote.isLiked) {
          return { ...quote, likeCount: currentLikes - 1, isLiked: false };
        }
        return { ...quote, likeCount: currentLikes + 1, isLiked: true };
      }
      return quote;
    });

    setQuotes(updatedQuotes);
    localStorage.setItem("mySavedQuotes", JSON.stringify(updatedQuotes));
  }

  function handleUnlikeQuote(quoteIdToUnlike: number) {
    const updatedQuotes = quotes.map((quote, id) => {
      if (id === quoteIdToUnlike) {
        const currentLikes = typeof quote.likeCount === "number" ? quote.likeCount : 1;
        return { ...quote, likeCount: currentLikes - 1, isLiked: false };
      }
      return quote;
    });

    setQuotes(updatedQuotes);
    localStorage.setItem("mySavedQuotes", JSON.stringify(updatedQuotes));
  }

  return (
    <QuotesContext.Provider
      value={{
        quotes,
        quoteIndex,
        isLoading,
        error,
        handleQuoteIndexUpdate,
        handleLikeQuote,
        handleUnlikeQuote,
      }}
    >
      {children}
    </QuotesContext.Provider>
  );
}