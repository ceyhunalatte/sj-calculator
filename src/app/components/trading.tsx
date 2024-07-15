import React from 'react';
import Input from '@/components/input';
import useTradingStore from '@/store/tradeStore';
import useProtocolStore from '@/store/protocolStore';
import { formatCurrency, formatNumber } from '@/lib/formatNumber';
import Coin from '@/components/coin';

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
    <div className='h-[100%] flex-1 flex flex-col animate-fade-in'>
      <h2 className='mb-4'>Trading simulator</h2>

      <div className='flex max-sm:flex-col w-full justify-between'>
        <div className='w-[42%] max-sm:w-full flex flex-col justify-end'>
          <div className='flex items-center'>
            <p>AVAX deposit: </p>
          </div>
          <div className='h-10 mt-1'>
            <Input 
              value={deposited.toString()}
              onChange={(e) => updateDeposited(Number((e.target as HTMLInputElement).value))}
            />
          </div>
        </div>

        <div className='w-[42%] max-sm:w-full max-sm:mt-2 flex flex-col justify-end'>
          <div className='flex min-[640px]:justify-end'>
            <p className='w-36'>AVAX minted: </p>    
            <p className='font-normal'>{formatNumber(getMinted())}</p>
          </div>

          <div className='flex min-[640px]:justify-end'>
            <p className='w-36'>AVAX position: </p>    
            <p className='font-normal'>{formatCurrency(getPosition())}</p>
          </div>
        </div>
      </div>

      <hr className='my-6' />

      <div className='flex flex-col w-full'>
        <div className='flex items-center'>
            <p>AVAX change: </p>
          </div>
          <div className='h-10 mt-1 min-[640px]:w-[42%]'>
            <Input 
              percentage
              value={changePercent.toString()}
              onChange={(e) => updateChangePercent(Number((e.target as HTMLInputElement).value))}
            />
          </div>
      </div>

      <hr className='my-6' />

      <div className='flex max-sm:flex-col w-full justify-between'>
        <Coin 
          name='xAVAX'
          value={getXavaxPrice(true)}
        />

        <div className='w-[42%] max-sm:w-full max-sm:mt-2 flex flex-col justify-end'>
          <div className='flex-row flex mt-1'>
            <p className='w-[160px]'>New xAVAX position: </p>
            <p className='font-normal'>{formatCurrency(getPosition(true))}</p> 
          </div>

          <div className='flex-row flex'>
            <p className='w-[160px]'>New AVAX amount: </p>
            <p className='font-normal'>{avaxReturned.toFixed(2)}</p> 
          </div>
        </div>
      </div>

      <hr className='my-6' />

      <div className='flex-row flex'>
        <p className='w-[160px]'>Dollar value change: </p>
        <p className='font-normal'>{changeInUsd.toFixed(2)}</p> 
      </div>

      <div className='flex-row flex'>
        <p className='w-[160px]'>AVAX Change: </p>
        <p className='font-normal'>{changeInAvax.toFixed(2)}</p> 
      </div>
    </div>
  );
};

export default Trading;