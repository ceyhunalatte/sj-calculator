import React from 'react';
import { formatCurrency, formatNumber } from '@/lib/formatNumber';
import useProtocolStore from '@/store/protocolStore';
import Input from '@/components/input';
import Coin from '@/components/coin';

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
    <div 
      className={`h-[100%] w-[100%] flex-1 flex flex-col animate-fade-in`}
    >
      <h2 className='mb-4'>Protocol simulator</h2>

      <div className='flex max-sm:flex-col w-full justify-between'>
        <div className='w-[42%] max-sm:w-full'>
          <Coin 
            name='AVAX' 
            value={avaxPrice}  
            onChange={(e) => updateAvaxPrice(Number((e.target as HTMLInputElement).value))}
          />
        </div>

        <div className='w-[42%] max-sm:w-full max-sm:mt-2 flex flex-col justify-end'>
          <div className='flex'>
            <p className='w-36'>AVAX deposited: </p>    
            <p className='font-normal'>{formatNumber(avaxDeposited)}</p>
          </div>

          <div className='flex'>
            <p className='w-36'>AVAX collateral: </p>    
            <p className='font-normal'>{formatCurrency(avaxCollateral)}</p>
          </div>
        </div>
      </div>

      <hr className='my-6' />

      <div className='flex max-sm:flex-col w-full justify-between'>
        <div className='w-[42%] max-sm:w-full'>
          <Coin 
            name='aUSD' 
            value={trueAusdPrice}  
          />

          <div className='flex mt-2'>
            <p className='w-36'>aUSD market cap: </p>    
            <p className='font-normal'>{formatCurrency(trueAusdMarketCap)}</p>
          </div>
        </div>

        <div className='w-[42%] max-sm:w-full flex flex-col justify-end'>
          <div className='flex items-center'>
            <p>aUSD circulation: </p>
          </div>
          <div className='h-10 mt-1'>
            <Input 
              value={ausdCirculation.toString()}
              onChange={(e) => updateAusdCirculation(Number((e.target as HTMLInputElement).value))}
            />
          </div>
        </div>
      </div>

      <hr className='my-6' />

      <div className='flex max-sm:flex-col w-full justify-between'>
        <div className='w-[42%] max-sm:w-full'>
          <Coin 
            name='xAVAX' 
            value={xavaxPrice}  
          />

          <div className='flex mt-2'>
            <p className='w-36'>xAVAX market cap: </p>    
            <p className='font-normal'>{formatCurrency(xavaxPrice)}</p>
          </div>
        </div>

        <div className='w-[42%] max-sm:w-full flex flex-col justify-end'>
          <div className='flex items-center'>
            <p>xAVAX circulation: </p>
          </div>
          <div className='h-10 mt-1'>
            <Input 
              value={xavaxCirculation.toString()}
              onChange={(e) => updateXavaxCirculation(Number((e.target as HTMLInputElement).value))}
            />
          </div>
        </div>
      </div>

      <hr className='my-6' />

      <div className='flex-row flex'>
        <p className='w-[160px]'>Leverage: </p>
        <p className='font-normal'>{leverage.toFixed(2)}</p>
      </div>

      <div className='flex-row flex'>
        <p className='w-[160px]'>Collaterazation ratio: </p>
        <p className='font-normal'>{collateralizationRatio.toFixed(2)}%</p>
      </div>
    </div>
  )
};

export default Protocol;