'use client'
import React, { useState } from 'react'

interface TabSwitchProps {
  options: {
    value: string
  }[],
  selected: number,
  onSelect: (index: number) => void
};

const TabSwitch = ({ options, selected, onSelect }: TabSwitchProps) => {
  if(!options?.length) return null
  
  return (
    <div className='mt-6 h-9 w-[640px] max-sm:w-[calc(100%-2rem)] bg-[#fff] flex rounded-[100px]'>
      {options.map((opt, i) => (
        <button 
          key={i} 
          className={`cursor-pointer h-full w-[50%] ${selected === i ? 'bg-gray-500' : 'bg-transparent'}  rounded-[100px]`}
          onClick={() => onSelect(i)}
        >
          <p 
            className={`font-medium ${selected === i ? 'text-[#fff]' : 'text-[#000]'}`}
          >
            {opt.value}
          </p>
        </button>
      ))}

    </div>
  );
};

export default TabSwitch;