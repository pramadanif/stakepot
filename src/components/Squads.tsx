'use client';

import React from 'react';
import { Button } from './Button';
import { Users, Sparkles } from 'lucide-react';

export const Squads: React.FC = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-gold via-orange to-urgency rounded-[40px] p-10 md:p-16 text-white relative shadow-2xl overflow-hidden">
          
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-yellow-200" />
                <span className="text-xs font-bold uppercase tracking-wider text-yellow-100">Viral Multiplier</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Win Together with Squads</h2>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                Create a Squad with up to 10 friends. If anyone in your squad wins the jackpot, everyone else gets a bonus prize instantly.
              </p>
              <Button variant="secondary" className="text-orange border-none shadow-xl">Create a Squad</Button>
            </div>

            <div className="flex-1 flex justify-center">
              <div className="relative w-72 h-72">
                 {/* Central Winner */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-4 border-white shadow-2xl overflow-hidden z-20">
                   <img src="https://picsum.photos/200/200?random=1" alt="Winner" className="w-full h-full object-cover" />
                 </div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60px] bg-white text-orange px-3 py-1 rounded-full text-xs font-bold shadow-lg z-30 animate-bounce">
                    WINNER!
                 </div>

                 {/* Squad Members Orbiting */}
                 {[...Array(5)].map((_, i) => (
                   <div 
                      key={i}
                      className="absolute top-1/2 left-1/2 w-12 h-12 rounded-full border-2 border-white/60 shadow-lg overflow-hidden"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${i * 72}deg) translate(100px) rotate(-${i * 72}deg)`
                      }}
                   >
                     <img src={`https://picsum.photos/100/100?random=${i + 2}`} alt="Member" className="w-full h-full object-cover grayscale opacity-80" />
                   </div>
                 ))}
                 
                 {/* Connecting Lines */}
                 <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 animate-[spin_20s_linear_infinite]">
                    <circle cx="50%" cy="50%" r="100" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                 </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
