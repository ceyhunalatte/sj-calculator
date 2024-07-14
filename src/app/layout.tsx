import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/header';
import Footer from './components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Stable Jack - Calculator',
  description: 'Instant calculator for xAVAX protocol and xAVAX trading'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-slate-950 relative`}>
        <Header />

        <main className='flex flex-col min-h-[calc(100vh-8rem)] max-w-screen items-center justify-start bg-slate-800'>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
};
