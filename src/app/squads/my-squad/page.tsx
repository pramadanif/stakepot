'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Users, Copy, Share2, Trophy, MessageSquare, LogOut, Loader2, Wallet, Check, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWallet, formatAddress, formatCSPR } from '@/context/WalletContext';
import { useMySquad, useSquadActions } from '@/hooks/useSquad';
import { usePoolStats } from '@/hooks/usePool';

export default function MySquad() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  
  const { wallet } = useWallet();
  const { squad, loading: isLoading, refetch } = useMySquad();
  const { leaveSquad, loading: actionLoading, error } = useSquadActions();
  const { stats: poolStats } = usePoolStats();

  const handleCopyInvite = () => {
    if (squad?.inviteCode) {
      const inviteUrl = `${window.location.origin}/squads/join?code=${squad.inviteCode}`;
      navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (squad && navigator.share) {
      try {
        await navigator.share({
          title: `Join ${squad.name} on StakePot!`,
          text: `Join my squad "${squad.name}" on StakePot! Use invite code: ${squad.inviteCode}`,
          url: `${window.location.origin}/squads/join?code=${squad.inviteCode}`,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      handleCopyInvite();
    }
  };

  const handleLeaveSquad = async () => {
    if (!confirm('Are you sure you want to leave this squad? You will forfeit your bonus eligibility for the current round.')) {
      return;
    }
    
    const success = await leaveSquad();
    if (success) {
      refetch();
      router.push('/squads');
    }
  };

  // Calculate win odds for a member
  const calculateOdds = (userDeposit: number) => {
    if (!poolStats || Number(poolStats.totalDeposited) === 0 || userDeposit === 0) return 'N/A';
    return `1 in ${Math.round(Number(poolStats.totalDeposited) / userDeposit).toLocaleString()}`;
  };

  // Not connected state
  if (!wallet?.isConnected) {
    return (
      <div className="min-h-screen bg-cream text-dark font-sans selection:bg-gold selection:text-white">
        <Navbar />
        <main className="pt-32 pb-20 px-4">
          <div className="max-w-6xl mx-auto">
            <Link href="/squads" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange mb-8 transition">
              <ArrowLeft size={20} />
              Back to Squads
            </Link>
            
            <div className="glass-card p-12 text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 rounded-full bg-orange/10 flex items-center justify-center mx-auto mb-6">
                <Wallet size={40} className="text-orange" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Connect Your Wallet</h2>
              <p className="text-gray-600 mb-6">
                Connect your wallet to view your squad.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream text-dark font-sans selection:bg-gold selection:text-white">
        <Navbar />
        <main className="pt-32 pb-20 px-4">
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-orange" size={48} />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // No squad state
  if (!squad) {
    return (
      <div className="min-h-screen bg-cream text-dark font-sans selection:bg-gold selection:text-white">
        <Navbar />
        <main className="pt-32 pb-20 px-4">
          <div className="max-w-6xl mx-auto">
            <Link href="/squads" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange mb-8 transition">
              <ArrowLeft size={20} />
              Back to Squads
            </Link>
            
            <div className="glass-card p-12 text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                <Users size={40} className="text-gold" />
              </div>
              <h2 className="text-2xl font-bold mb-3">No Squad Yet</h2>
              <p className="text-gray-600 mb-6">
                You haven't joined a squad yet. Create one or join an existing squad to earn bonus rewards!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/squads/create"
                  className="px-6 py-3 bg-orange text-white font-bold rounded-xl hover:bg-orange/90 transition"
                >
                  Create a Squad
                </Link>
                <Link 
                  href="/squads/join"
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition"
                >
                  Find a Squad
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const members = squad?.squadMembers || [];
  const isAdmin = members.find(m => m.userId === wallet?.address)?.role === 1; // role 1 is ADMIN

  return (
    <div className="min-h-screen bg-cream text-dark font-sans selection:bg-gold selection:text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          
          <Link href="/squads" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange mb-8 transition">
            <ArrowLeft size={20} />
            Back to Squads
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Squad Info */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Header Card */}
              <div className="glass-card p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Users size={120} />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold to-orange flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                      {squad.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-dark">{squad.name}</h1>
                      <p className="text-gray-500 font-medium flex items-center gap-2">
                        <Trophy size={14} className="text-gold" />
                        Total Won: {formatCSPR(squad?.totalWon || '0')} CSPR
                      </p>
                    </div>
                  </div>

                  {/* Invite Code Display */}
                  <div className="mb-6 p-4 bg-gold/10 rounded-xl border border-gold/20">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Invite Code</p>
                    <p className="text-2xl font-bold tracking-widest text-gold">{squad.inviteCode}</p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={handleCopyInvite}
                      className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition"
                    >
                      {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                      {copied ? 'Copied!' : 'Copy Invite Link'}
                    </button>
                    <button 
                      onClick={handleShare}
                      className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition"
                    >
                      <Share2 size={16} />
                      Share Squad
                    </button>
                  </div>
                </div>
              </div>

              {/* Members List */}
              <div className="glass-card p-6">
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                  <Users size={20} />
                  Squad Members ({members.length}/5)
                </h3>
                
                <div className="space-y-4">
                  {members.map((member) => {
                    const isCurrentUser = member.user?.walletAddress === wallet?.address;
                    const displayName = isCurrentUser 
                      ? 'You' 
                      : formatAddress(member.user?.walletAddress || '', 6);
                    
                    return (
                      <div key={member.id} className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-white/60">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${isCurrentUser ? 'bg-orange/20 text-orange' : 'bg-gray-200 text-gray-600'}`}>
                            {displayName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-dark flex items-center gap-2">
                              {displayName}
                              {member.role === 1 && (
                                <span className="text-[10px] bg-orange/10 text-orange px-2 py-0.5 rounded-full uppercase tracking-wider">Admin</span>
                              )}
                            </p>
                            <p className="text-xs text-gray-500">
                              Joined {new Date(member.joinedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right flex items-center gap-2">
                          <div>
                            <p className="text-sm font-bold text-gray-700">
                              {calculateOdds(Number(member.user?.ticketBalance || 0))}
                            </p>
                            <p className="text-[10px] text-gray-400 uppercase">Win Chance</p>
                          </div>
                          {!isCurrentUser && (
                            <a
                              href={`https://testnet.cspr.live/account/${member.user?.walletAddress}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 hover:bg-gray-100 rounded-lg transition"
                            >
                              <ExternalLink size={14} className="text-gray-400" />
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Empty Slots */}
                  {[...Array(5 - members.length)].map((_, i) => (
                    <div key={`empty-${i}`} className="flex items-center justify-between p-4 border-2 border-dashed border-gray-300 rounded-xl">
                      <div className="flex items-center gap-3 opacity-50">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <Users size={16} className="text-gray-400" />
                        </div>
                        <span className="font-medium text-gray-400">Empty Slot</span>
                      </div>
                      <button 
                        onClick={handleCopyInvite}
                        className="text-sm font-bold text-orange hover:underline"
                      >
                        + Invite
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Chat & Actions */}
            <div className="space-y-8">
              
              {/* Squad Stats */}
              <div className="glass-card p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Trophy size={20} className="text-gold" />
                  Squad Stats
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Win Count</span>
                    <span className="font-bold">{squad.totalWins || 0}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Total Winnings</span>
                    <span className="font-bold text-gold">{formatCSPR(squad.totalWon || '0')} CSPR</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">Squad Bonus</span>
                    <span className="font-bold text-orange">5%</span>
                  </div>
                </div>
              </div>

              {/* Squad Chat (Mock) */}
              <div className="glass-card p-6 h-[300px] flex flex-col">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <MessageSquare size={20} />
                  Squad Chat
                </h3>
                
                <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                  <div className="text-center">
                    <MessageSquare size={40} className="mx-auto mb-2 opacity-30" />
                    <p>Chat coming soon!</p>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="p-6 rounded-xl border border-red-100 bg-red-50/50">
                <h4 className="font-bold text-red-600 mb-2">Danger Zone</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Leaving the squad will forfeit your bonus eligibility for the current round.
                </p>
                {error && (
                  <p className="text-sm text-red-600 mb-4">{error}</p>
                )}
                <button 
                  onClick={handleLeaveSquad}
                  disabled={actionLoading}
                  className="w-full py-2 border border-red-200 text-red-600 rounded-lg font-bold text-sm hover:bg-red-50 transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {actionLoading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <LogOut size={16} />
                  )}
                  Leave Squad
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
