'use client';

import React from 'react';
import { Button } from './Button';
import { Coins, Trophy, ShieldCheck, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full pt-32 pb-20 px-4 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange/10 rounded-full blur-[80px] translate-y-1/4 -translate-x-1/4" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-orange/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-urgency animate-pulse"></span>
            <span className="text-sm font-semibold text-orange tracking-wide uppercase">Current Jackpot: 125,400 CSPR</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-6 text-dark">
            Deposit CSPR. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-orange">Win Jackpots.</span> <br/>
            Never Lose.
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            A no-loss prize pool powered by Casper staking. 
            You keep your principal. The yield becomes the jackpot.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button variant="primary" icon>Join the Jackpot</Button>
            <Button variant="secondary">How It Works (30s)</Button>
          </div>

          <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-sm font-medium text-gray-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-gold" />
              <span>Audited & Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-gold" />
              <span>~11% APY Logic</span>
            </div>
          </div>
        </motion.div>

        {/* Visual Content - The Pot */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center"
        >
          <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px]">
            {/* Glowing Rings */}
            <div className="absolute inset-0 border-[3px] border-gold/20 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-4 border-[3px] border-orange/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            
            {/* Main Card Floating */}
            <div className="absolute inset-0 flex items-center justify-center animate-float">
               <div className="w-64 h-72 bg-gradient-to-b from-white to-cream rounded-[40px] shadow-2xl border border-white/50 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-gold/10 to-transparent" />
                  
                  <Trophy className="w-24 h-24 text-gold mb-4 drop-shadow-lg" />
                  
                  <div className="text-center z-10">
                    <span className="block text-gray-400 text-xs font-bold tracking-widest uppercase mb-1">Weekly Prize</span>
                    <span className="block text-4xl font-black text-dark tracking-tight">5,000</span>
                    <span className="block text-orange font-bold text-lg">CSPR</span>
                  </div>

                  {/* Floating Coins Particles */}
                  <Coins className="absolute top-10 right-4 w-6 h-6 text-gold/60 animate-bounce" style={{ animationDuration: '2s' }} />
                  <Coins className="absolute bottom-10 left-4 w-8 h-8 text-orange/60 animate-bounce" style={{ animationDuration: '3s' }} />
               </div>
            </div>

            {/* Floating Badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 -left-4 glass-card px-4 py-3 rounded-2xl shadow-lg flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-lg">💸</span>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Risk</p>
                <p className="text-sm font-bold text-dark">0% Loss</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-20 -right-4 glass-card px-4 py-3 rounded-2xl shadow-lg flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-lg">⏱️</span>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Draw in</p>
                <p className="text-sm font-bold text-urgency">04:12:30</p>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};