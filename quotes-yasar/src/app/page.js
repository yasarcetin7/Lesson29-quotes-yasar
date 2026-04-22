'use client';
import { useContext } from 'react';
import { Button } from '@/components/Button';
import { H3 } from '@/typography/H3';
import { QuotesContext } from './QuotesContext';
import Link from 'next/link';

export default function Home() {
  const { 
    quotes, 
    quoteIndex, 
    handleQuoteIndexUpdate, 
    handleLikeQuote 
  } = useContext(QuotesContext);
  const currentQuote = quotes[quoteIndex];
  const { quote, author, likeCount } = currentQuote; 

  return (
    
    <main className='min-h-screen flex items-center justify-center  bg-slate-200'>
      <div className='w-full max-w-2xl px-4 flex flex-col'>
       <Link 
            href="/user/quotes/liked" 
            className="text-slate-600 hover:text-slate-900 mb-6 font-medium inline-block flex items-center gap-2"
          >
           <span>--</span> See quotes I liked<span>--</span>
          </Link>
      <section className='bg-slate-50/50 rounded-md p-10 flex flex-col w-full max-w-lg'>
        <div className='self-end flex items-center gap-3 mb-6'>
          <span className='font-bold text-red-500'>
            {likeCount || 0} Like
          </span>
          <Button variant={'primary'} onClick={handleLikeQuote}>
            ❤️
          </Button>
        </div>
        {/* ----------------------------- */}

        <H3 element='p'>{quote}</H3>
        
        <span className='text-md font-semibold text-slate-900 self-end mt-4'>
          - {author}
        </span>
        <div className='mt-6 flex flex-col'>
          <Button variant={'primary'} onClick={handleQuoteIndexUpdate}>
            Next Quote
          </Button>
        </div>
        
      </section>
      </div>
    </main>
  );
}