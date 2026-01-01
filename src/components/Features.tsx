'use client';

import React from 'react';
import { Shield, Gift, Lock, Zap } from 'lucide-react';
import { Feature } from '@/types';

const features: Feature[] = [
  {
    id: 'risk',
    title: 'No Risk, No Loss',
    description: "If you don't win, you keep 100% of your money. Withdraw anytime.",
    icon: Shield,
  },
  {
    id: 'jackpots',
    title: 'Weekly Jackpots',
    description: 'Prizes are generated from the collective staking yield of the pool.',
    icon: Gift,
  },
  {
    id: 'safety',
    title: 'Principal Safe',
    description: "Your deposit is staked on Casper validators. It never leaves the secure contract.",
    icon: Lock,
  },
  {
    id: 'easy',
    title: 'No Staking Skills',
    description: 'Forget delegating and bonding periods. Just deposit and play.',
    icon: Zap,
  },
];

export const Features: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-white/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-dark">Why StakePot?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">It's the thrill of a lottery with the safety of a savings account.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div 
              key={feature.id}
              className="group bg-cream p-8 rounded-[32px] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-transparent hover:border-gold/30"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-orange" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-dark">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
