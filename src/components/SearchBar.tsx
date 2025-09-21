'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query === '') return;
    router.push(`/search?q=${query}`);
  };

  return (
    <form onSubmit={handleSearch} className='mx-auto w-[100%] md:w-[60%] my-8'>
      <div className='flex w-full'>
        <label className='input mr-4 w-full'>
          <svg
            className='h-[1em] opacity-50'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'>
            <g
              strokeLinejoin='round'
              strokeLinecap='round'
              strokeWidth='2.5'
              fill='none'
              stroke='currentColor'>
              <circle cx='11' cy='11' r='8'></circle>
              <path d='m21 21-4.3-4.3'></path>
            </g>
          </svg>
          <input
            type='search'
            className='grow'
            placeholder='Search Pokemon name'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>

        <button className='btn rounded-md'>Search</button>
      </div>
    </form>
  );
};

export default SearchBar;
