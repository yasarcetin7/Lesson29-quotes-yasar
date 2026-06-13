"use client";

import { useContext } from "react";
import { Button } from "@/components/Button";
import { H3 } from "@/typography/H3";
import { QuotesContext } from "./QuotesContext";
import Link from "next/link";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  // 1. Context ve User kancalarından verileri çekiyoruz
  const {
    quotes,
    quoteIndex,
    isLoading: quotesLoading, // User'ın isLoading'i ile karışmasın diye yeniden adlandırdık
    error,
    handleQuoteIndexUpdate,
    handleLikeQuote,
  } = useContext(QuotesContext);
  
  const { user, isLoading: userLoading } = useUser();

  // 2. Yüklenme (Loading) Durumu
  if (quotesLoading) {
    return (
      <main className='min-h-screen flex items-center justify-center bg-base-200 transition-colors duration-300'>
        <p className="text-xl font-semibold">Loading quotes...</p>
      </main>
    );
  }

  // 3. Hata (Error) Durumu
  if (error) { 
    return (
      <main className='min-h-screen flex items-center justify-center bg-base-200 transition-colors duration-300'>
        <p className="text-xl font-semibold text-error">Error: {error}</p>
      </main>
    );
  }

// 4. Veri Yoksa (Boş Durum)
  const currentQuote = quotes[quoteIndex];
  if (!currentQuote) {
    return (
      <main className='min-h-screen flex flex-col items-center justify-center bg-base-200 transition-colors duration-300'>
        <div className="text-center">
          <p className="mb-6 text-lg font-medium text-slate-600">No quotes yet. Add one or approve quotes in the database.</p>
          
          {/* Kullanıcı giriş YAPMIŞSA Söz Ekle butonu çıksın */}
          {user && (
            <Link href="/user/quotes/new" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Add a Quote Now
            </Link>
          )}

          {/* Kullanıcı giriş YAPMAMIŞSA Log In butonu çıksın */}
          {!userLoading && !user && (
            <a href="/auth/login" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              Log In to Add a Quote
            </a>
          )}
        </div>
      </main>
    );
  }

  // 5. Her şey yolundaysa ANA EKRAN (Tasarımlı kısım)
  const { quote, author, likeCount } = currentQuote;

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-base-200 transition-colors duration-300 pt-24 pb-20 sm:pt-0 sm:pb-0">
      
      {/* ÜST NAVBAR (Navigasyon Menüsü) */}
      <nav className="absolute top-0 left-0 w-full flex items-center justify-between p-4 px-6 md:px-10 z-50 bg-transparent">
        
        <div className="flex items-center gap-4">
          {/* AVATAR KISMI */}
          <div className="w-10 sm:w-12 rounded-full border-2 border-primary overflow-hidden shadow-sm">
            <img 
              src={user?.picture || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`}
              alt="User Avatar"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* KULLANICI GİRİŞ YAPMAMIŞSA */}
          {!userLoading && !user && (
            <>
              <a 
                href="/auth/login" 
                className="btn btn-sm btn-success text-success-content rounded-md shadow-sm border border-base-content/20"
              >
                Log in
              </a>
              <Link
                href="/user/quotes/liked"
                className="btn btn-sm btn-primary text-primary-content rounded-md shadow-sm border border-base-content/20"
              >
                See quotes I liked 
              </Link>
            </>
          )}
          
          {/* KULLANICI GİRİŞ YAPMIŞSA */}
          {!userLoading && user && (
            <>
              <a 
                href="/auth/logout" 
                className="btn btn-sm btn-success text-success-content rounded-md shadow-sm border border-base-content/20"
              >
                Log out
              </a>
              <Link
                href="/user/quotes/new"
                className="btn btn-sm btn-primary text-primary-content rounded-md shadow-sm border border-base-content/20"
              >
                Add Quote
              </Link>
              <Link
                href="/user/quotes/liked"
                className="btn btn-sm btn-primary text-primary-content rounded-md shadow-sm border border-base-content/20"
              >
                See quotes I liked 
              </Link>
            </>
          )}
        </div>
        
        {/* TEMA DEĞİŞTİRİCİ */}
        <div>
          <ThemeSwitcher />
        </div>
      </nav>
    
      {/* --- ANA İÇERİK (Söz Kartı) --- */}
      <div className="w-full max-w-lg px-5 flex flex-col items-center gap-5 mt-16 sm:mt-0">
        
        <section className="bg-base-100 rounded-md p-8 md:p-12 flex flex-col w-full shadow-xl border border-base-content/20">
          
          <div className="self-end flex items-center gap-3 mb-4 md:mb-6">
            <span className="font-bold text-error">
              {likeCount || 0} Like
            </span>
            <Button variant={"primary"} onClick={handleLikeQuote} aria-label="Like this quote">
              ❤️
            </Button>
          </div>

          <H3 element="p">{quote}</H3>

          <span className="text-sm md:text-base font-semibold text-base-content/80 self-end mt-4">
            - {author}
          </span>

          <div className="mt-4 md:mt-6 flex flex-col">
            <Button variant={"primary"} onClick={handleQuoteIndexUpdate}>
              Next Quote
            </Button>
          </div>
          
        </section>
      </div>

    </main>
  );
}