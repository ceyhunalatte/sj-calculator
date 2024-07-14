'use client'

import React from 'react';
import { formatCurrency, formatNumber } from '@/lib/formatNumber';
import useProtocolStore from '@/store/protocolStore';
import Input from '@/components/input';

const Protocol = ({  }) => {
  const { 
    avaxPrice, 
    avaxDeposited, 
    ausdCirculation, 
    baseAusdPrice,
    xavaxCirculation,
    updateAvaxPrice,
    updateAusdCirculation,
    updateXavaxCirculation
  } = useProtocolStore();
  const avaxCollateral = avaxPrice * avaxDeposited;
  const ausdMarketCap = ausdCirculation * baseAusdPrice;
  const collateralizationRatio = (avaxCollateral / ausdMarketCap) * 100;

  // aUSD market cap cannot exceed total value of AVAX collateral
  const trueAusdMarketCap = collateralizationRatio > 100 
    ? ausdCirculation 
    : avaxCollateral;

  // As long as the total value of AVAX collateral is greater than
  // aUSD market cap, aUSD is always $1. AVAX colleteral value cannot be exceeded
  // IMPORTANT: Rest of the calculations respect this rule
  const trueAusdPrice = avaxCollateral > trueAusdMarketCap
    ? 1
    : avaxCollateral / ausdCirculation;

  const xavaxMarketCap = avaxCollateral > trueAusdMarketCap
    ? avaxCollateral - trueAusdMarketCap
    : 0;

  const xavaxPrice = avaxCollateral > trueAusdMarketCap
    ? xavaxMarketCap / xavaxCirculation
    : 0;
 
  const leverage = avaxCollateral / xavaxMarketCap;

  return (
    <div className='h-[100%] flex-1 flex flex-col'>
      <h2>Protocol simulator</h2>

      <div className='flex-row flex'> 
        <p>AVAX price:</p>
        <Input 
          value={avaxPrice.toString()}
          onChange={(e) => updateAvaxPrice(Number((e.target as HTMLInputElement).value))}
        />
      </div>

      <div className='flex-row flex'>
        <p>AVAX deposited: {formatNumber(avaxDeposited)}</p>
      </div>

      <div className='flex-row flex'>
        <p>AVAX collateral: {formatCurrency(avaxCollateral)}</p>
      </div>
      
      <hr className='padding-20' />

      <div className='flex-row flex'>
        <p>aUSD market cap: {formatCurrency(trueAusdMarketCap)}</p>
      </div>

      <div className='flex-row flex'>
        <p>aUSD circulation: </p>
        <Input 
          value={ausdCirculation.toString()}
          onChange={(e) => updateAusdCirculation(Number((e.target as HTMLInputElement).value))}
        />
      </div>

      <div className='flex-row flex'>
        <p>aUSD price: {formatCurrency(trueAusdPrice)}</p>
      </div>

      <hr className='padding-20' />

      <div className='flex-row flex'>
        <p>xAVAX market cap: {formatCurrency(xavaxMarketCap)}</p>
      </div>

      <div className='flex-row flex'>
        <p>xAVAX circulation: </p>
        <Input 
          value={xavaxCirculation.toString()}
          onChange={(e) => updateXavaxCirculation(Number((e.target as HTMLInputElement).value))}
        />
      </div>

      <div className='flex-row flex'>
        <p>xAVAX price: {formatCurrency(xavaxPrice)}</p>
      </div>

      <hr className='padding-20' />

      <div className='flex-row flex'>
        <p>Leverage: {leverage.toFixed(2)}</p>
      </div>

      <div className='flex-row flex'>
        <p>Collaterazation ratio: {collateralizationRatio.toFixed(2)}%</p>
      </div>

    </div>
  )
};

export default Protocol;