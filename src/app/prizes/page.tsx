'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Trophy, Calendar, Clock, User, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Prizes() {
  const winners = [
    { id: 1, address: '0x123...abc', amount: '5,400 CSPR', date: 'Oct 24, 2025', round: '#42' },
    { id: 2, address: '0x456...def', amount: '4,850 CSPR', date: 'Oct 17, 2025', round: '#41' },
    { id: 3, address: '0x789...ghi', amount: '6,100 CSPR', date: 'Oct 10, 2025', round: '#40' },
    { id: 4, address: '0xabc...jkl', amount: '5,200 CSPR', date: 'Oct 03, 2025', round: '#39' },
    { id: 5, address: '0xdef...mno', amount: '5,900 CSPR', date: 'Sep 26, 2025', round: '#38' },
  ];

  return (
    <div className="min-h-screen bg-cream text-dark font-sans selection:bg-gold selection:text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4 font-display">Weekly Prizes</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every week, the yield generated from the pool is awarded to one lucky winner.
              The more you save, the higher your chances.
            </p>
          </div>

          {/* Next Draw Hero */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-3xl overflow-hidden bg-dark text-white p-8 md:p-12 mb-20"
          >
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange/20 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 mb-6">
                  <Clock className="w-4 h-4 text-gold" />
                  <span className="text-sm font-semibold tracking-wide uppercase">Next Draw in: 2d 14h 35m</span>
                </div>
                
                <h2 className="text-4xl md:text-6xl font-bold mb-2">
                  <span className="text-gold">5,240</span> CSPR
                </h2>
                <p className="text-gray-400 text-lg mb-8">Estimated Prize Pool for Round #43</p>
                
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 min-w-[140px]">
                    <p className="text-gray-400 text-xs uppercase font-bold mb-1">Total Value Locked</p>
                    <p className="text-2xl font-bold">1.2M CSPR</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 min-w-[140px]">
                    <p className="text-gray-400 text-xs uppercase font-bold mb-1">Total Players</p>
                    <p className="text-2xl font-bold">842</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <div className="absolute inset-0 border-4 border-gold/30 rounded-full animate-[spin_20s_linear_infinite]" />
                  <div className="absolute inset-4 border-4 border-orange/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Trophy className="w-32 h-32 text-gold drop-shadow-[0_0_30px_rgba(250,177,47,0.5)]" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Winners List */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Trophy className="text-gold" />
              Hall of Fame
            </h3>

            <div className="space-y-4">
              {winners.map((winner, i) => (
                <motion.div 
                  key={winner.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-4 md:p-6 flex items-center justify-between hover:border-orange/30 transition group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold text-lg">
                      #{winner.round.replace('#', '')}
                    </div>
                    <div>
                      <p className="font-bold text-dark flex items-center gap-2">
                        {winner.address}
                        <ExternalLink size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 transition" />
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <Calendar size={12} />
                        {winner.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-orange">{winner.amount}</p>
                    <p className="text-xs text-gray-500 uppercase font-bold">Won</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <button className="text-gray-500 font-medium hover:text-orange transition">
                Load More Winners
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
