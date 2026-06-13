'use client';

import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Button } from '@/components/Button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/field';
import { Input } from '@/components/input';
import { Textarea } from '@/components/textarea';
import { useActionState } from 'react';
import { addNewQuote, type AddNewQuoteState } from './action';
import { redirect } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';

const initialAddNewQuoteState: AddNewQuoteState = {
  success: false,
};

export default function AddNewQuotePage() {
  // 2. EKSİK: user ve isLoading değişkenlerini sayfada tanımladık
  const { user, isLoading } = useUser();

  const [state, dispatchAction, isPending] = useActionState<
    AddNewQuoteState,
    FormData
  >(addNewQuote, initialAddNewQuoteState);

  if (isPending) return <p>Loading...</p>;
  
  if (state.success) return redirect('/user/quotes/new/success');

  return (
    <main className='relative min-h-screen flex items-center justify-center bg-base-200 transition-colors duration-300 pt-24 pb-20 sm:pt-0 sm:pb-0'>
      <nav className="absolute top-0 left-0 w-full flex items-center justify-between p-4 px-6 md:px-10 z-50 bg-transparent">
        
        <div className="flex items-center gap-4">
          {/* AVATAR KISMI */}
          <div className="w-10 sm:w-12 rounded-full border-2 border-primary overflow-hidden shadow-sm">
            <img 
              src={user?.picture || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`}
              alt="Tailwind-CSS-Avatar-component"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {!isLoading && user && (
						<>
            <a 
              href="/auth/logout" 
              className="btn btn-sm btn-success text-success-content rounded-md shadow-sm border border-base-content/20"
            >
              Log out
            </a>
						<a 
              href="/" 
              className="btn btn-sm btn-success text-success-content rounded-md shadow-sm border border-base-content/20"
            >
              Homepage
            </a></>
          )}
        </div> 

        <div>
          <ThemeSwitcher />
        </div>
      </nav>
  
          
      <form className='bg-base-100 rounded-md p-7 md:p-12 flex flex-col w-full shadow-xl border border-base-content/20 max-w-md' action={dispatchAction}>
        <FieldGroup>
          <FieldSet>
						
            <FieldLegend>Add A New Quote</FieldLegend>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor='author'>Author</FieldLabel>
                <Input
                  type='text'
                  name='author'
                  id='author'
                  placeholder='Evil Rabbit'
                  required
                  aria-invalid={!!state.errors?.fieldErrors?.author}
                  defaultValue={state.data?.author}
                />
                {state.errors?.fieldErrors?.author && (
                  <FieldError errors={state.errors?.fieldErrors?.author}>
                    {state.errors?.fieldErrors?.author}
                  </FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor='quote'>Quote</FieldLabel>
                <Textarea
                  id='quote'
                  name='quote'
                  className='resize-none'
                  aria-invalid={!!state.errors?.fieldErrors?.quote}
                  defaultValue={state.data?.quote}
                />
                {state.errors?.fieldErrors?.quote && (
                  <FieldError errors={state.errors?.fieldErrors?.quote}>
                    {state.errors?.fieldErrors?.quote}
                  </FieldError>
                )}
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation='horizontal'>
            <Button variant="primary" type='submit'>Create</Button>
            <Button variant='primary'type='reset'>Clear</Button>
          </Field>
        </FieldGroup>
      </form>
      {state.message ? <p className='mt-10'>{state.message}</p> : <></>}
    </main>
  );
}