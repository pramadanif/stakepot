'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/Button';
import { Users, UserPlus, Crown, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

import Link from 'next/link';

export default function Squads() {
  const topSquads = [
    { rank: 1, name: "CryptoWhales", members: 5, totalWin: "12,500 CSPR" },
    { rank: 2, name: "CasperKnights", members: 4, totalWin: "8,200 CSPR" },
    { rank: 3, name: "LuckyCharm", members: 5, totalWin: "5,100 CSPR" },
  ];

  return (
    <div className="min-h-screen bg-cream text-dark font-sans selection:bg-gold selection:text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange/10 px-4 py-2 rounded-full text-orange font-bold text-sm mb-6">
              <Zap size={16} />
              <span>Win Together, Earn More</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display">
              Join a <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-orange">Squad</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Team up with 5 friends. If anyone in your squad wins the jackpot, 
              everyone gets a <span className="font-bold text-dark">5% bonus reward</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/squads/create">
                <Button variant="primary" icon>Create a Squad</Button>
              </Link>
              <Link href="/squads/join">
                <Button variant="secondary">Find a Squad</Button>
              </Link>
            </div>
          </div>

          {/* How it works cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="glass-card p-8 text-center hover:-translate-y-2 transition duration-300">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                <UserPlus size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Form a Team</h3>
              <p className="text-gray-600">Create a squad and invite up to 4 friends to join you.</p>
            </div>
            <div className="glass-card p-8 text-center hover:-translate-y-2 transition duration-300">
              <div className="w-16 h-16 mx-auto bg-gold/20 rounded-2xl flex items-center justify-center text-gold mb-6">
                <Crown size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Win Jackpot</h3>
              <p className="text-gray-600">If any member wins the weekly draw, the whole squad celebrates.</p>
            </div>
            <div className="glass-card p-8 text-center hover:-translate-y-2 transition duration-300">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Get Bonus</h3>
              <p className="text-gray-600">The winner gets the jackpot, and squad members share a 5% bonus pool.</p>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <Crown className="text-gold" />
                Top Squads
              </h3>
              <button className="text-orange font-medium hover:underline">View All</button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-100 text-sm font-bold text-gray-500 uppercase tracking-wider">
                <div className="col-span-2 text-center">Rank</div>
                <div className="col-span-6">Squad Name</div>
                <div className="col-span-2 text-center">Members</div>
                <div className="col-span-2 text-right">Total Won</div>
              </div>
              
              {topSquads.map((squad) => (
                <div key={squad.rank} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-orange/5 transition border-b border-gray-100 last:border-0">
                  <div className="col-span-2 text-center font-bold text-lg text-gray-400">
                    {squad.rank === 1 ? '🥇' : squad.rank === 2 ? '🥈' : squad.rank === 3 ? '🥉' : `#${squad.rank}`}
                  </div>
                  <div className="col-span-6 font-bold text-dark flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300" />
                    {squad.name}
                  </div>
                  <div className="col-span-2 text-center flex items-center justify-center gap-1 text-gray-600">
                    <Users size={14} />
                    {squad.members}/5
                  </div>
                  <div className="col-span-2 text-right font-bold text-gold">
                    {squad.totalWin}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
