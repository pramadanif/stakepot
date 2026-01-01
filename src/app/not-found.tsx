'use client';

import Link from 'next/link';
import { Button } from '@/components/Button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream text-dark font-sans selection:bg-gold selection:text-white flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-lg mx-auto">
          <div className="w-24 h-24 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <SearchX size={48} className="text-orange" />
          </div>
          
          <h1 className="text-6xl font-bold font-display mb-4 text-dark">404</h1>
          <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Oops! The page you are looking for seems to have vanished into the blockchain. 
            Don't worry, your funds are safe!
          </p>
          
          <Link href="/">
            <Button variant="primary" icon>Back to Home</Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
