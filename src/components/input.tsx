import React from 'react';

interface InputProps {
  value: string,
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
}

const Input = ({ value, onChange }: InputProps) => (
  <input 
    value={value}
    onChange={onChange}
    className='text-black ml-1 w-20'
  />
);

export default Input;