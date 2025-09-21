import React from 'react';

import PokemonResult from '@/components/PokemonResult';
import SearchBar from '@/components/SearchBar';

interface SearchPageProps {
  searchParams: Promise<Record<string, string>>;
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const urlSearchParams = new URLSearchParams(await searchParams);
  let q = urlSearchParams.get('q');

  if (q === '') {
    q = 'no pokemon found';
  }

  return (
    <div className='font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 w-full'>
      <h1 className='text-4xl font-bold text-center'>Pokemon Finder</h1>
      <SearchBar />
      {q && <PokemonResult name={q as string} />}
    </div>
  );
};

export default SearchPage;
