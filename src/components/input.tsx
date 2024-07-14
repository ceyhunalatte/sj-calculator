import React from 'react';

interface InputProps {
  value: string,
  currency?: boolean,
  percentage?: boolean,
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
};

/**
 * 
 * @param value input value
 * @param currency if true, shows currency sign before the input
 * @param onChange onChange behavior
 * @returns input
 */
const Input = ({ value, currency, percentage, onChange }: InputProps) => (
  <div className='flex w-full rounded-[8px] overflow-hidden h-[100%]'>
    {currency && (
      <div 
        className='h-[100%] w-[32px] bg-gray-500 flex justify-center items-center'
      >
        <p className='font-medium'>$</p>
      </div>
    )}
    
    <input 
      value={isNaN(Number(value)) ? 0 : value}
      onChange={onChange}
      className='text-black rounded-none w-full pl-1 outline-none'
    />

    {percentage && (
      <div 
        className='h-[100%] w-[32px] bg-gray-500 flex justify-center items-center'
      >
        <p className='font-medium'>%</p>
      </div>
    )}
  </div>
);

export default Input;