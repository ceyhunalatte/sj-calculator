import Trading from './components/trading';

export default function Home() {
  return (
    <div className='w-[640px] max-sm:w-[calc(100%-2rem)] max-sm:flex-col flex p-4 bg-slate-700 gap-8 my-10 rounded-[16px]'>
      {/* <Protocol /> */}
      <Trading />
    </div>
  );
};
