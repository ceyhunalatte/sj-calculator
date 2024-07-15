import React from 'react';

const Header = ({  }) => (
  <header className='h-16 bg-[#232323] sticky top-0 max-w-screen px-4 flex items-center justify-center shadow-lg'>
    <div className='w-full max-sm:w-[100%] h-[100%] flex items-center justify-between'>
      <div className='flex items-center'>
        <img 
          src='assets/logo.png'
          className='h-12 rounded-[100%]'
        />

        <p className='font-titilium text-[#eb4142] text-[21px] font-[600] ml-2 max-sm:hidden'>
          Stable Jack
        </p>
      </div>

      <p className='text-center font-light text-gray-200'>
        Protocol & Trade Simulator
      </p>
    </div>
  </header>  
);

export default Header;