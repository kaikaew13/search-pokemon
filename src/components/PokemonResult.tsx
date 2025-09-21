'use client';

import { GET_POKEMON, PokemonQueryResult } from '@/lib/queries';
import { useQuery } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface PokemonResultProps {
  name: string;
}

const PokemonResult = ({ name }: PokemonResultProps) => {
  const router = useRouter();
  const { data, loading, error } = useQuery<PokemonQueryResult>(GET_POKEMON, {
    variables: { name },
  });

  if (loading) return <p className='text-center text-3xl'>Loading...</p>;
  if (error)
    return <p className='text-center text-3xl'>Error: {error.message}</p>;
  if (!data?.pokemon)
    return <p className='text-center text-3xl'>No Pokemon Found</p>;

  const pokemon = data.pokemon;
  return (
    <div className=''>
      <img
        className='mx-auto my-4 rounded-xl'
        src={pokemon.image}
        alt={pokemon.name}
      />
      <h1 className='text-3xl font-bold my-4'>{pokemon.name}</h1>
      <p>
        <span className='font-bold'>Weight: </span>
        {pokemon.weight.minimum} - {pokemon.weight.maximum}
      </p>
      <p>
        <span className='font-bold'>Height: </span>
        {pokemon.height.minimum} - {pokemon.height.maximum}
      </p>
      <p>
        <span className='font-bold'>Classification: </span>
        {pokemon.classification}
      </p>
      <p>
        <span className='font-bold'>Types: </span>
        {pokemon.types.join(', ')}
      </p>
      <p>
        <span className='font-bold'>Resistant: </span>
        {pokemon.resistant.join(', ')}
      </p>
      <p>
        <span className='font-bold'>Weaknesses: </span>
        {pokemon.weaknesses.join(', ')}
      </p>
      <p>
        <span className='font-bold'>Fleet Rate: </span>
        {pokemon.fleeRate}
      </p>
      <p>
        <span className='font-bold'>Max CP: </span>
        {pokemon.maxCP}
      </p>
      <p>
        <span className='font-bold'>Max HP: </span>
        {pokemon.maxHP}
      </p>
      <div className='flex w-full justify-between'>
        <div className='w-1/2 pr-4'>
          <h3 className='text-2xl font-bold my-4'>Fast Attacks:</h3>
          <div className='overflow-x-auto rounded-box border border-base-content/5 bg-base-100'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Damage</th>
                </tr>
              </thead>
              <tbody>
                {pokemon.attacks.fast.map((each) => (
                  <tr key={each.name}>
                    <th>{each.name}</th>
                    <td>{each.type}</td>
                    <td>{each.damage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='w-1/2 pl-4'>
          <h3 className='text-2xl font-bold my-4'>Special Attacks:</h3>
          <div className='overflow-x-auto rounded-box border border-base-content/5 bg-base-100'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Damage</th>
                </tr>
              </thead>
              <tbody>
                {pokemon.attacks.special.map((each) => (
                  <tr key={each.name}>
                    <th>{each.name}</th>
                    <td>{each.type}</td>
                    <td>{each.damage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <h3 className='text-2xl font-bold my-4'>Evolutions:</h3>
      {pokemon.evolutions === null ? (
        <div>No evolution</div>
      ) : (
        <div className='overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-[50%]'>
          <table className='table'>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Types</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.evolutions.map((each) => (
                <tr key={each.name}>
                  <td onClick={() => router.push(`/search?q=${each.name}`)}>
                    <div className='avatar cursor-pointer'>
                      <div className='rounded-xl h-30 w-30'>
                        <img src={each.image} alt={each.name} />
                      </div>
                    </div>
                  </td>
                  <td
                    className='cursor-pointer underline'
                    onClick={() => router.push(`/search?q=${each.name}`)}>
                    {each.name}
                  </td>
                  <td className='w-[50%]'>{each.types.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PokemonResult;
