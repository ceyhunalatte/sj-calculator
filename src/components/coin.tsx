import Image from 'next/image';
import React, { useState } from 'react';
import Input from './input';
import { formatCurrency } from '@/lib/formatNumber';

interface CoinProps {
  name: string,
  value: number,
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void
};

/**
 * Coin component to showcase current coin prices, supports price input
 * @param name name of the coin in uppercase
 * @param value current value on coin
 * @param onChange if true, shows and updates input
 * @returns coin component with dynamic price
 */
const Coin = ({ name, value, onChange }: CoinProps) => {
  // Use for src and alt info
  const lowercaseName = name.toLowerCase();

  return (
    <div className='flex flex-col items-start w-full'>
      <div className='flex h-10 items-center'>
        <Image 
          src={`/assets/${lowercaseName}.png`}
          width='24' 
          height='24'
          alt={lowercaseName}
          className='mr-1 object-contain'
        />

        <h3 className='mr-1'>{name}</h3>
      </div>

      
        {onChange ? (
          <div className='h-8 w-full mt-1'>
            <Input value={value.toString()} onChange={onChange} currency />
          </div>
        ) : (
          <p className='font-bold'>{formatCurrency(value)}</p> 
        )}
    </div>
  );
};

export default Coin;