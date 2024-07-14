'use client'

import React from 'react';
import Input from '@/components/input';
import useTradingStore from '@/store/tradeStore';
import useProtocolStore from '@/store/protocolStore';
import { formatCurrency, formatNumber } from '@/lib/formatNumber';

const Trading = ({ }) => {
  const { 
    deposited,
    changePercent,
    updateDeposited,
    updateChangePercent
  } = useTradingStore();
  const { 
    avaxPrice, 
    avaxDeposited, 
    ausdCirculation,  
    baseAusdPrice, 
    xavaxCirculation
  } = useProtocolStore();

  // Calculate the new AVAX price based on percentage
  const newAvaxPrice = avaxPrice + avaxPrice * changePercent / 100

  // Helper to get xAVAX changes dynamically with the help of
  // protocolStore, returns both starting and new positions.
  // isNew: if true, returns new position
  function getXavaxPrice(isNew?: boolean): number {
    const avaxCollateral = (isNew ? newAvaxPrice : avaxPrice) * avaxDeposited;
    const ausdMarketCap = ausdCirculation * baseAusdPrice;
    const collateralizationRatio = (avaxCollateral / ausdMarketCap) * 100;
    const trueAusdMarketCap = collateralizationRatio > 100 
      ? ausdCirculation 
      : avaxCollateral;

    const xavaxMarketCap = avaxCollateral > trueAusdMarketCap
      ? avaxCollateral - trueAusdMarketCap
      : 0;

    return avaxCollateral > trueAusdMarketCap
      ? xavaxMarketCap / xavaxCirculation
      : 0;
  }

  // Helper to get amount of total xAVAX minted depending on 
  // deposited AVAX amount and price of AVAX
  // isNew: if true, returns based on updated xAVAX price
  function getMinted(isNew?: boolean): number {
    return (deposited * avaxPrice) / getXavaxPrice(isNew);
  }
  
  // Helper to get position depending on xAVAX price
  // isNew: if true, returns new position
  function getPosition(isNew?: boolean): number {
    return getMinted() * getXavaxPrice(isNew);
  }

  // Other dynamic values
  const avaxReturned = 
    getPosition(true) / (avaxPrice + avaxPrice * changePercent / 100);
  const changeInUsd = (getPosition(true) - getPosition()) / getPosition() * 100;
  const changeInAvax = (avaxReturned - deposited) / deposited * 100;

  return (
    <div className='h-[100%] flex-1 flex flex-col'>
      <h2>Trading simulator</h2>

      <div className='flex-row flex'> 
        <p>AVAX deposited:</p>
        <Input 
          value={deposited.toString()}
          onChange={(e) => updateDeposited(Number((e.target as HTMLInputElement).value))}
        />
      </div>

      <div className='flex-row flex'>
        <p>xAVAX minted: {formatNumber(getMinted())}</p>
      </div>

      <div className='flex-row flex'>
        <p>xAVAX starting position: {formatNumber(getPosition())}</p>
      </div>

      <hr />

      <div className='flex-row flex'> 
        <p>AVAX price change %:</p>
        <Input 
          value={changePercent.toString()}
          onChange={(e) => updateChangePercent(Number((e.target as HTMLInputElement).value))}
        />
      </div>

      <hr />

      <div className='flex-row flex'>
        <p>xAVAX destination position: {formatCurrency(getPosition(true))}</p>
      </div>

      <div className='flex-row flex'>
        <p>xAVAX price: {formatCurrency(getXavaxPrice(true))}</p>
      </div>

      <div className='flex-row flex'>
        <p>AVAX returned: {avaxReturned.toFixed(2)}</p>
      </div>

      <div className='flex-row flex'>
        <p>Dollar value change: {changeInUsd.toFixed(2)}%</p>
      </div>

      <div className='flex-row flex'>
        <p>AVAX Change: {changeInAvax.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default Trading;