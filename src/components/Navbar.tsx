'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
      <div className={`max-w-6xl mx-auto mx-4 px-6 py-3 rounded-full flex justify-between items-center transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg border border-white/40' : 'bg-transparent'}`}>
        
        <Link href="/" className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-orange flex items-center justify-center text-white font-bold text-lg">
             C
           </div>
           <span className="font-bold text-xl text-dark tracking-tight">StakePot</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/dashboard" className="hover:text-orange transition">Dashboard</Link>
          <Link href="/prizes" className="hover:text-orange transition">Prizes</Link>
          <Link href="/squads" className="hover:text-orange transition">Squads</Link>
        </div>

        <Button variant="primary" className="!px-5 !py-2 !text-sm">Connect Wallet</Button>
      </div>
    </nav>
  );
};
