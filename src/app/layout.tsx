import type { Metadata } from 'next';
import { Inter, Titillium_Web } from 'next/font/google';
import './globals.css';
import Header from './components/header';
import Footer from './components/footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});
const titilium = Titillium_Web({ 
  subsets: ['latin'], 
  weight: ["200", "300", "400", "600", "700", "900"],
  variable: '--font-titilium',
})

export const metadata: Metadata = {
  title: 'Stable Jack | Simulator',
  description: 'Instant calculator for xAVAX protocol and xAVAX trading'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} ${titilium.variable} bg-[#232323]`}>
        <Header />

        <main className='flex flex-col min-h-[calc(100vh-8rem)] max-w-screen items-center justify-start bg-[#3c3b3b]'>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
};
