'use client';
import { QuotesContext } from '@/app/QuotesContext';
import { Button } from '@/components/Button';
import { H3 } from '@/typography/H3';
import { useContext } from 'react';
import Link from 'next/link';

export default function LikedQuotesPage() {
  const { quotes, handleUnlikeQuote } = useContext(QuotesContext);
  const likedQuotes = quotes
    .map((quote, index) => ({ ...quote, originalIndex: index }))
    .filter(quote => quote.isLiked === true);

  return (
    <main className='min-h-screen flex items-center justify-center bg-slate-200'>
      <div className='w-full max-w-2xl px-4 flex flex-col'>
        
        <Link 
          href="/" 
          className="text-slate-600 hover:text-slate-900 mb-6 font-medium inline-block flex items-center gap-2"
        >
          <span>←</span> Ana Sayfaya Dön
        </Link>
       <H3 element='h1'>Liked Quotes</H3>
      
  
      {likedQuotes.length === 0 ? (
        <p className='text-slate-500 text-lg'>Henüz hiç söz beğenmediniz.</p>
      ) : (
       
        <div className='flex flex-col gap-6 w-full max-w-2xl px-4'>
          {likedQuotes.map((item) => (
            <section key={item.originalIndex} className='bg-slate-50/50 rounded-md p-8 flex flex-col shadow-sm'>
              
              <div className='self-end flex items-center gap-3 mb-4'>
                <span className='font-medium text-slate-600'>Listeden Kaldır:</span>
                {/* Silme butonuna tıkladığımızda o sözün orijinal sırasını (id) gönderiyoruz */}
                <Button variant={'icon'} onClick={() => handleUnlikeQuote(item.originalIndex)}>
                  💔
                </Button>
              </div>

              <H3 element='p'>{item.quote}</H3>
              
              <span className='text-md font-semibold text-slate-900 self-end mt-4'>
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