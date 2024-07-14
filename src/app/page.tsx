'use client'

import React, { useState } from 'react';
import Trading from './components/trading';
import TabSwitch from '@/components/tabSwitch';
import Protocol from './components/protocol';

export default function Home() {
  const [tab, setTab] = useState(0);

  return (
    <React.Fragment>
      <TabSwitch 
        options={[{ value: 'Protocol' }, { value: 'Trade' }]}
        selected={tab}
        onSelect={(i) => setTab(i)}
      />
      <div className='w-[640px] max-sm:w-[calc(100%-2rem)] max-sm:flex-col flex p-4 bg-slate-700 gap-8 mb-10 mt-6 rounded-[16px]'>
        {!tab ? <Protocol /> : <Trading />}
      </div>
    </React.Fragment>
  );
};
