'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/Button';
import { Wallet, TrendingUp, Ticket, ArrowUpRight, ArrowDownLeft, History, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('');

  return (
    <div className="min-h-screen bg-cream text-dark font-sans selection:bg-gold selection:text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-600">Manage your deposits and check your winning chances.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Balance Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                <Wallet size={64} />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center text-orange">
                  <Wallet size={20} />
                </div>
                <span className="font-medium text-gray-600">Total Deposit</span>
              </div>
              <div className="text-3xl font-bold mb-1">12,500 <span className="text-sm font-normal text-gray-500">CSPR</span></div>
              <div className="text-sm text-green-600 flex items-center gap-1">
                <TrendingUp size={14} />
                <span>Active in next draw</span>
              </div>
            </motion.div>

            {/* Tickets Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                <Ticket size={64} />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <Ticket size={20} />
                </div>
                <span className="font-medium text-gray-600">My Tickets</span>
              </div>
              <div className="text-3xl font-bold mb-1">12,500 <span className="text-sm font-normal text-gray-500">cPOT</span></div>
              <div className="text-sm text-gray-500">
                1 CSPR = 1 Ticket
              </div>
            </motion.div>

            {/* Odds Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 relative overflow-hidden group bg-gradient-to-br from-white/60 to-gold/5"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                <Trophy size={64} />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-urgency/10 flex items-center justify-center text-urgency">
                  <Trophy size={20} />
                </div>
                <span className="font-medium text-gray-600">Win Chance</span>
              </div>
              <div className="text-3xl font-bold mb-1">1 in 450</div>
              <div className="text-sm text-gray-500">
                Based on current pool size
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Action Area */}
            <div className="lg:col-span-2">
              <div className="glass-card p-8">
                <div className="flex gap-6 border-b border-gray-200 mb-8">
                  <button 
                    onClick={() => setActiveTab('deposit')}
                    className={`pb-4 text-lg font-medium transition relative ${activeTab === 'deposit' ? 'text-orange' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    Deposit
                    {activeTab === 'deposit' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange" />}
                  </button>
                  <button 
                    onClick={() => setActiveTab('withdraw')}
                    className={`pb-4 text-lg font-medium transition relative ${activeTab === 'withdraw' ? 'text-orange' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    Withdraw
                    {activeTab === 'withdraw' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange" />}
                  </button>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount ({activeTab === 'deposit' ? 'CSPR' : 'cPOT'})
                  </label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange transition"
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-orange hover:bg-orange/10 px-3 py-1 rounded-lg transition">
                      MAX
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 flex justify-between">
                    <span>Balance: 24,500 CSPR</span>
                    {activeTab === 'deposit' && <span>Est. Weekly Yield: ~2.5 CSPR</span>}
                  </p>
                </div>

                <Button variant="primary" className="w-full py-4 text-lg">
                  {activeTab === 'deposit' ? 'Deposit & Get Tickets' : 'Withdraw Funds'}
                </Button>

                <div className="mt-6 p-4 bg-gold/10 rounded-xl border border-gold/20 text-sm text-gray-700">
                  <p className="font-bold mb-1 flex items-center gap-2">
                    <span className="text-lg">💡</span>
                    No Loss Guarantee
                  </p>
                  <p>
                    Your deposit is staked on Casper Network. You can withdraw your principal at any time (subject to standard unbonding period). Only the yield is used for prizes.
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 h-full">
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                  <History size={20} />
                  Recent Activity
                </h3>
                
                <div className="space-y-6">
                  {[1, 2, 3, 4].map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i % 2 === 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                          {i % 2 === 0 ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                        </div>
                        <div>
                          <p className="font-medium text-dark">{i % 2 === 0 ? 'Deposit' : 'Withdraw'}</p>
                          <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                      <div className={`font-bold ${i % 2 === 0 ? 'text-green-600' : 'text-dark'}`}>
                        {i % 2 === 0 ? '+' : '-'}500 CSPR
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-8 py-2 text-sm font-medium text-gray-500 hover:text-orange transition border border-dashed border-gray-300 rounded-lg hover:border-orange">
                  View All History
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
