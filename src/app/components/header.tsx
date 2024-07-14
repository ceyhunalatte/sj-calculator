import React from 'react';

const Header = ({  }) => (
  <header className='h-16 bg-slate-950 sticky top-0 max-w-screen px-4 flex items-center justify-center'>
    <div className='w-[880px] max-sm:w-[100%] h-[100%] flex items-center'>
      <img 
        src='assets/logo.png'
        className='h-12 rounded-[100%]'
      />
      <p className='ml-4 text-center font-light'>
        Stable Jack - Calculator
      </p>
    </div>
  </header>  
);

export default Header;