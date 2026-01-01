'use client';

import React from 'react';
import { Button } from './Button';
import { Github, Twitter, Disc } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white pt-20 pb-10 px-4">
        {/* Final CTA */}
        <div className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
                This week, <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-orange">it could be you.</span>
            </h2>
            <Button variant="urgent" className="text-xl px-12 py-6 shadow-orange/40">
                JOIN StakePot NOW
            </Button>
        </div>

        <div className="border-t border-gray-800 pt-10 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start">
                <h3 className="text-2xl font-bold text-cream mb-2">StakePot</h3>
                <p className="text-gray-500 text-sm">The no-loss lottery protocol.</p>
            </div>

            <div className="flex gap-4 text-sm text-gray-400">
                <span className="px-3 py-1 border border-gray-700 rounded-full">Built on Casper</span>
                <span className="px-3 py-1 border border-gray-700 rounded-full">Verifiable Randomness</span>
                <span className="px-3 py-1 border border-gray-700 rounded-full">Audited</span>
            </div>

            <div className="flex gap-6">
                <a href="#" className="text-gray-500 hover:text-white transition"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="text-gray-500 hover:text-white transition"><Github className="w-5 h-5" /></a>
                <a href="#" className="text-gray-500 hover:text-white transition"><Disc className="w-5 h-5" /></a>
            </div>
        </div>
        
        <div className="text-center mt-10 text-gray-700 text-xs">
            © 2024 StakePot Protocol. Not financial advice.
        </div>
    </footer>
  );
};
