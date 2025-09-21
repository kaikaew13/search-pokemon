'use client';

import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

import PokemonResult from '@/components/PokemonResult';
import SearchBar from '@/components/SearchBar';

const SearchResult = () => {
  const params = useSearchParams();
  let q = params.get('q');

  if (q === '') {
    q = 'no pokemon found';
  }

  return (
    <div className='font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 w-full'>
      <h1 className='text-4xl font-bold text-center'>Pokemon Finder</h1>
      <SearchBar />
      {q && (
        <Suspense fallback={<p>Loading Pokemon...</p>}>
          <PokemonResult name={q as string} />
        </Suspense>
      )}
    </div>
  );
};

export default SearchResult;
