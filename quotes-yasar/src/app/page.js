'use client';

import { quotes as initialQuotes } from '@/app/quotes';
import { Button } from '@/components/Button';
import { useState } from 'react';
import { H3 } from '@/typography/H3';

export default function Home() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quotesList, setQuotesList] = useState(initialQuotes);
  const { quote, author, likeCount } = quotesList[quoteIndex];

  function handleLike() {
    const updatedQuotes = [...quotesList];
    updatedQuotes[quoteIndex].likeCount = updatedQuotes[quoteIndex].likeCount + 1;
    setQuotesList(updatedQuotes);
  }

  function handleClick() {
    setQuoteIndex((quoteIndex + 1) % quotesList.length);
  }
  return (

    <main className='min-h-screen flex items-center justify-center bg-slate-200'>
      <section className='bg-slate-50/50 rounded-md p-10 flex flex-col min-w-[400px]'>
        
        <div className='self-end flex items-center gap-3 mb-6'>
          <span className='font-bold text-red-500'>
            {likeCount} Like
          </span>
          <Button variant={'icon'} onClick={handleLike}>
            ❤️
          </Button>
        </div>
        {/* ----------------------------- */}

        <H3 element='p'>{quote}</H3>
        
        <span className='text-md font-semibold text-slate-900 self-end mt-4'>
          - {author}
        </span>
        
        <div className='mt-6 flex flex-col'>
          <Button variant={'primary'} onClick={handleClick}>
            Next Quote
          </Button>
        </div>
        
      </section>
    </main>
  );
}