'use client';

import React from 'react';
import { Wallet, Landmark, TrendingUp, Trophy, ShieldCheck } from 'lucide-react';
import { Step } from '@/types';

const steps: Step[] = [
  { id: 1, title: 'Deposit', description: 'Deposit CSPR into the Pot.', icon: Wallet },
  { id: 2, title: 'Stake', description: 'Assets are staked securely.', icon: Landmark },
  { id: 3, title: 'Yield', description: 'Interest builds the prize.', icon: TrendingUp },
  { id: 4, title: 'Win', description: 'One winner takes the yield.', icon: Trophy },
  { id: 5, title: 'No Loss', description: 'Withdraw your principal anytime.', icon: ShieldCheck },
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-dark text-cream relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold font-bold tracking-widest uppercase text-sm">Simple Process</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2 text-white">How It Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-800 -z-10" />

          {steps.map((step, idx) => (
            <div key={step.id} className="relative flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gray-900 border-4 border-gray-800 flex items-center justify-center mb-6 z-10 transition-colors duration-300 hover:border-gold hover:bg-gray-800">
                <step.icon className="w-10 h-10 text-gold" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gold text-dark font-bold flex items-center justify-center border-4 border-gray-900">
                    {step.id}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
