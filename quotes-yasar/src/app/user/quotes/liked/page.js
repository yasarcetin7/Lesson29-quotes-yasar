"use client";
import { QuotesContext } from "@/app/QuotesContext";
import { Button } from "@/components/Button";
import { H3 } from "@/typography/H3";
import { useContext } from "react";
import Link from "next/link";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function LikedQuotesPage() {
  const { quotes, handleUnlikeQuote } = useContext(QuotesContext);
  const likedQuotes = quotes
    .map((quote, index) => ({ ...quote, originalIndex: index }))
    .filter((quote) => quote.isLiked === true);

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-slate-200 dark:bg-slate-950 py-10 sm:py-0 transition-colors duration-300 pt-20 pb-20 sm:pt-0 sm:pb-0">
      <div className="absolute top-4 right-4 z-50">
        <ThemeSwitcher />
      </div>

      <div className="absolute bottom-4 right-4 avatar">
        <div className="w-12 sm:w-16 rounded-full border-2 border-purple dark:border-tahiti">
          <img
            src="https://img.daisyui.com/images/profile/demo/superperson@192.webp"
            alt="User Avatar"
          />
        </div>
      </div>

      <div className="w-full max-w-lg px-4 flex flex-col items-center gap-4">
        <Link
          href="/"
          className="w-full font-medium flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-800 text-purple dark:text-tahiti p-3 px-6 rounded-full hover:opacity-80 transition-opacity"
        >
          <span>←</span> Return to Home Page
        </Link>

        <div className="font-medium text-purple dark:text-tahiti w-full text-center mt-2 mb-1">
          <H3 element="p">Liked Quotes</H3>
        </div>

        {likedQuotes.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400 text-lg text-center bg-slate-50/80 dark:bg-slate-800/80 w-full p-8 rounded-md shadow-lg">
            You haven't liked any of the quotes yet.
          </p>
        ) : (
          <div className="flex flex-col gap-6 w-full">
            {likedQuotes.map((item) => (
              <section
                key={item.originalIndex}
                className="bg-slate-50/80 dark:bg-slate-800/80 rounded-md p-6 md:p-10 flex flex-col w-full shadow-lg"
              >
                <div className="self-end flex items-center gap-3 mb-4 md:mb-6">
                  <span className="font-medium text-slate-600 dark:text-slate-400 text-sm md:text-base">
                    Remove from list :
                  </span>

                  <Button
                    variant={"secondary"}
                    onClick={() => handleUnlikeQuote(item.originalIndex)}
                    aria-label="Remove quote from liked list"
                  >
                    💔
                  </Button>
                </div>

                <div className="text-slate-900 dark:text-slate-100">
                  <H3 element="p">{item.quote}</H3>
                </div>

                <span className="text-sm md:text-base font-semibold text-slate-900 dark:text-slate-200 self-end mt-4">
                  - {item.author}
                </span>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
