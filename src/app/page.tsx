import Protocol from './components/protocol';
import Trading from './components/trading';

export default function Home() {
  return (
    <main className='flex min-h-screen items-start justify-center p-24 bg-slate-800 gap-8'>
      <Protocol />
      <Trading />
    </main>
  );
}
