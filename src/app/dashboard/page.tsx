'use client';

import React, { useState, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/Button';
import { Wallet, TrendingUp, Ticket, ArrowUpRight, ArrowDownLeft, History, Trophy, AlertCircle, Loader2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWallet, formatCSPR } from '@/context/WalletContext';
import { useUser, useUserTransactions, useUserWithdrawals } from '@/hooks/useUser';
import { usePoolStats, useCurrentRound, useCountdown } from '@/hooks/usePool';
import { useDeposit, useWithdraw } from '@/hooks/useTransactions';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('');
  
  const { wallet } = useWallet();
  const { user, loading: userLoading } = useUser();
  const { transactions, loading: txLoading } = useUserTransactions();
  const { withdrawals } = useUserWithdrawals();
  const { stats: poolStats } = usePoolStats();
  const { round: currentRound } = useCurrentRound();
  const countdown = useCountdown(currentRound?.nextDrawTime || null);
  
  const { deposit, loading: depositLoading, error: depositError } = useDeposit();
  const { requestWithdraw, loading: withdrawLoading, error: withdrawError } = useWithdraw();

  // Calculate win odds
  const winOdds = useMemo(() => {
    if (!user || !poolStats) return null;
    const totalTickets = Number(poolStats.totalTickets);
    const userTickets = Number(user.depositedAmount);
    if (totalTickets === 0 || userTickets === 0) return null;
    return Math.round(totalTickets / userTickets);
  }, [user, poolStats]);

  // Handle max button
  const handleMax = () => {
    if (activeTab === 'deposit' && wallet?.balance) {
      // Leave some for gas (5 CSPR)
      const max = Math.max(0, Number(wallet.balance) - 5);
      setAmount(max.toString());
    } else if (activeTab === 'withdraw' && user) {
      setAmount(user.depositedAmount.toString());
    }
  };

  // Handle deposit/withdraw
  const handleSubmit = async () => {
    const amountNum = parseFloat(amount);
    if (!amountNum || amountNum <= 0) return;
    
    if (activeTab === 'deposit') {
      await deposit(amountNum);
    } else {
      await requestWithdraw(amountNum);
    }
    setAmount('');
  };

  // Format time ago
  const formatTimeAgo = (date: string) => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  // If not connected
  if (!wallet?.isConnected) {
    return (
      <div className="min-h-screen bg-cream text-dark font-sans selection:bg-gold selection:text-white">
        <Navbar />
        <main className="pt-32 pb-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="glass-card p-12">
              <div className="w-20 h-20 rounded-full bg-orange/10 flex items-center justify-center mx-auto mb-6">
                <Wallet size={40} className="text-orange" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Connect Your Wallet</h2>
              <p className="text-gray-600 mb-6">
                Connect your Casper Wallet to view your dashboard, make deposits, and start earning chances to win prizes.
              </p>
              <Button variant="primary" onClick={() => {}}>
                Connect Wallet
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream text-dark font-sans selection:bg-gold selection:text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
              <p className="text-gray-600">Manage your deposits and check your winning chances.</p>
            </div>
            {countdown && (
              <div className="glass-card px-6 py-3 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Next Draw In</p>
                <p className="text-xl font-bold text-orange">
                  {countdown.days}d {countdown.hours}h {countdown.minutes}m
                </p>
              </div>
            )}
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
              <div className="text-3xl font-bold mb-1">
                {userLoading ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>{formatCSPR(user?.depositedAmount || '0')} <span className="text-sm font-normal text-gray-500">CSPR</span></>
                )}
              </div>
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
              <div className="text-3xl font-bold mb-1">
                {userLoading ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>{formatCSPR(user?.ticketBalance || '0')} <span className="text-sm font-normal text-gray-500">cPOT</span></>
                )}
              </div>
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
              <div className="text-3xl font-bold mb-1">
                {winOdds ? `1 in ${winOdds.toLocaleString()}` : 'N/A'}
              </div>
              <div className="text-sm text-gray-500">
                Based on current pool size
              </div>
            </motion.div>
          </div>

          {/* Pending Withdrawals Banner */}
          {withdrawals && withdrawals.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-2xl"
            >
              <div className="flex items-start gap-3">
                <Clock className="text-amber-600 mt-0.5" size={20} />
                <div>
                  <p className="font-medium text-amber-800">Pending Withdrawals</p>
                  <p className="text-sm text-amber-700">
                    You have {withdrawals.filter(w => w.status === 'PENDING').length} pending withdrawal(s). 
                    Unbonding period is 14 days on Casper Network.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

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

                {/* Error Display */}
                {(depositError || withdrawError) && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                    <AlertCircle className="text-red-500 mt-0.5" size={20} />
                    <div>
                      <p className="font-medium text-red-800">Transaction Failed</p>
                      <p className="text-sm text-red-600">{depositError || withdrawError}</p>
                    </div>
                  </div>
                )}

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
                      min="0"
                      step="1"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange transition"
                    />
                    <button 
                      onClick={handleMax}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-orange hover:bg-orange/10 px-3 py-1 rounded-lg transition"
                    >
                      MAX
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 flex justify-between">
                    <span>
                      {activeTab === 'deposit' 
                        ? `Wallet: ${formatCSPR(wallet?.balance || '0')} CSPR`
                        : `Deposited: ${formatCSPR(user?.depositedAmount || '0')} CSPR`
                      }
                    </span>
                    {activeTab === 'deposit' && amount && (
                      <span>Min: 10 CSPR</span>
                    )}
                  </p>
                </div>

                <Button 
                  variant="primary" 
                  className="w-full py-4 text-lg"
                  onClick={handleSubmit}
                  disabled={depositLoading || withdrawLoading || !amount || parseFloat(amount) <= 0}
                >
                  {(depositLoading || withdrawLoading) ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin" size={20} />
                      {activeTab === 'deposit' ? 'Depositing...' : 'Withdrawing...'}
                    </span>
                  ) : (
                    activeTab === 'deposit' ? 'Deposit & Get Tickets' : 'Request Withdrawal'
                  )}
                </Button>

                <div className="mt-6 p-4 bg-gold/10 rounded-xl border border-gold/20 text-sm text-gray-700">
                  <p className="font-bold mb-1 flex items-center gap-2">
                    <span className="text-lg">💡</span>
                    {activeTab === 'deposit' ? 'No Loss Guarantee' : 'Withdrawal Info'}
                  </p>
                  <p>
                    {activeTab === 'deposit' 
                      ? 'Your deposit is staked on Casper Network. You can withdraw your principal at any time (subject to 14-day unbonding period). Only the yield is used for prizes.'
                      : 'Withdrawals are subject to Casper Network\'s 14-day unbonding period. Your funds will be available after the unbonding completes.'
                    }
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
                
                {txLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="animate-spin text-orange" size={32} />
                  </div>
                ) : transactions && transactions.length > 0 ? (
                  <div className="space-y-6">
                    {transactions.slice(0, 5).map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'DEPOSIT' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {tx.type === 'DEPOSIT' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                          </div>
                          <div>
                            <p className="font-medium text-dark capitalize">{tx.type.toLowerCase()}</p>
                            <p className="text-xs text-gray-500">{formatTimeAgo(tx.createdAt)}</p>
                          </div>
                        </div>
                        <div className={`font-bold ${tx.type === 'DEPOSIT' ? 'text-green-600' : 'text-dark'}`}>
                          {tx.type === 'DEPOSIT' ? '+' : '-'}{formatCSPR(tx.amount)} CSPR
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <History size={32} className="mx-auto mb-2 opacity-40" />
                    <p>No transactions yet</p>
                    <p className="text-sm">Make your first deposit to get started!</p>
                  </div>
                )}
                
                {transactions && transactions.length > 5 && (
                  <button className="w-full mt-8 py-2 text-sm font-medium text-gray-500 hover:text-orange transition border border-dashed border-gray-300 rounded-lg hover:border-orange">
                    View All History
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Prize History */}
          {user && Number(user.totalWinnings) > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Trophy className="text-gold" />
                Your Winnings
              </h2>
              <div className="glass-card p-6">
                <div className="text-center">
                  <p className="text-gray-600 mb-2">Total Prize Money Won</p>
                  <p className="text-4xl font-bold text-gold">{formatCSPR(user.totalWinnings)} CSPR</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
