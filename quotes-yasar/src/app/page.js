"use client";
import { useContext } from "react";
import { Button } from "@/components/Button";
import { H3 } from "@/typography/H3";
import { QuotesContext } from "./QuotesContext";
import Link from "next/link";

import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Home() {
  const { quotes, quoteIndex, handleQuoteIndexUpdate, handleLikeQuote } =
    useContext(QuotesContext);

  const currentQuote = quotes[quoteIndex];
  const { quote, author, likeCount } = currentQuote;

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-slate-200 dark:bg-slate-950 transition-colors duration-300 pt-20 pb-20 sm:pt-0 sm:pb-0">
      {/* 1. TEMA BUTONU: Sağ Üst Köşeye Sabitlendi */}
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
          href="/user/quotes/liked"
          className="w-full font-medium flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-800 text-purple dark:text-tahiti p-3 px-6 rounded-full hover:opacity-80 transition-opacity"
        >
          <span>--</span> See quotes I liked <span>--</span>
        </Link>

        <section className="bg-slate-50/80 dark:bg-slate-800/80 rounded-md  p-6 md:p-10 flex flex-col w-full shadow-lg">
          <div className="self-end flex items-center gap-3 mb-4 md:mb-6">
            <span className="font-bold text-red-700 dark:text-red-400">
              {likeCount || 0} Like
            </span>
            <Button variant={"primary"} onClick={handleLikeQuote} aria-label="Like this quote">
              ❤️
            </Button>
          </div>

          <H3 element="p">{quote}</H3>

          <span className="text-sm md:text-base font-semibold text-slate-900 dark:text-slate-100 self-end mt-4">
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
