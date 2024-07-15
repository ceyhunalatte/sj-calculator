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
  <div className='flex w-full rounded-md h-[100%] border-[1px] border-gray-600 bg-[#333333]'>
    {currency && (
      <div 
        className='rounded-s-md h-[100%] w-[32px] bg-gray-500 flex justify-center items-center'
      >
        <p className='font-medium'>$</p>
      </div>
    )}
    
    <input 
      value={value}
      onChange={onChange}
      type='number'
      step='3'
      className='text-white font-normal rounded-none w-full pl-1 outline-none bg-transparent'
    />

    {percentage && (
      <div 
        className='rounded-e-md h-[100%] w-[32px] bg-gray-500 flex justify-center items-center'
      >
        <p className='font-medium'>%</p>
      </div>
    )}
  </div>
);

export default Input;