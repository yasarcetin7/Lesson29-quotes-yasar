"use client";
import { useContext } from "react";
import { Button } from "@/components/Button";
import { H3 } from "@/typography/H3";
import { QuotesContext } from "./QuotesContext";
import Link from "next/link";
import ThemeSwitcher from "@/components/ThemeSwitcher";
// Eski v3 importu yerine güncel v4 importunu kullanıyoruz (daha önce konuştuğumuz gibi)
import { useUser } from '@auth0/nextjs-auth0'; 

export default function Home() {
  const { quotes, quoteIndex, handleQuoteIndexUpdate, handleLikeQuote } =
    useContext(QuotesContext);
  const { user, isLoading } = useUser();
  const currentQuote = quotes[quoteIndex];
  const { quote, author, likedBy } = currentQuote;

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-base-200 transition-colors duration-300 pt-24 pb-20 sm:pt-0 sm:pb-0">
      <nav className="absolute top-0 left-0 w-full flex items-center justify-between p-4 px-6 md:px-10 z-50 bg-transparent">
        
        <div className="flex items-center gap-4">

          {/* AVATAR KISMI */}
          <div className="w-10 sm:w-12 rounded-full border-2 border-primary overflow-hidden shadow-sm bg-base-300">
            <img 
              src={user?.picture || `https://ui-avatars.com/api/?name=${user?.name || 'Guest'}&background=random`} 
              alt="User Avatar"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {!isLoading && !user && (
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
          
          
          {!isLoading && user && (
            <>

              <a 
                href="/auth/logout" 
                className="btn btn-sm btn-success text-success-content rounded-md shadow-sm border border-base-content/20"
              >
                Log Out
              </a>

              <Link
                href="/user/quotes/liked"
                className="btn btn-sm btn-primary text-primary-content rounded-md shadow-sm border border-base-content/20"
              >
                See quotes I liked 
              </Link>
            </>
          )}
        </div>

        <div>
          <ThemeSwitcher />
        </div>
      </nav>
    
      {/* --- ANA İÇERİK --- */}
      <div className="w-full max-w-lg px-5 flex flex-col items-center gap-5 mt-16 sm:mt-0">
        
        <section className="bg-base-100 rounded-md p-8 md:p-12 flex flex-col w-full shadow-xl border border-base-content/20">
          <div className="self-end flex items-center gap-3 mb-4 md:mb-6">
            
            <span className="font-bold text-error">
              {likedBy?.length || 0} Like
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