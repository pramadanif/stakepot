'use client';

import React, { useState, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Search, Lock, Unlock, Loader2, Wallet, AlertCircle, KeyRound } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWallet, formatCSPR } from '@/context/WalletContext';
import { useSquads, useSquadActions } from '@/hooks/useSquad';

export default function JoinSquad() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [showInviteInput, setShowInviteInput] = useState(false);
  const [joiningSquadId, setJoiningSquadId] = useState<string | null>(null);
  
  const { wallet } = useWallet();
  const { squads, loading: isLoading } = useSquads();
  const { joinSquad, loading: joinLoading, error } = useSquadActions();

  const filteredSquads = useMemo(() => {
    if (!squads) return [];
    return squads.filter(squad => 
      squad.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [squads, searchTerm]);

  const handleJoin = async (squadId: string, requiresCode: boolean = false) => {
    if (!wallet?.address) return;
    
    setJoiningSquadId(squadId);
    const code = requiresCode ? inviteCode : squadId; // Use squad ID as code if not requiring invite code
    const success = await joinSquad(code);
    if (success) {
      router.push('/squads/my-squad');
    }
    setJoiningSquadId(null);
  };

  const handleJoinWithCode = async () => {
    if (!inviteCode.trim()) return;
    
    // Find squad by invite code
    const squad = squads?.find(s => s.inviteCode === inviteCode.toUpperCase());
    if (squad) {
      await handleJoin(squad.id, true);
    }
  };

  // Not connected state
  if (!wallet?.isConnected) {
    return (
      <div className="min-h-screen bg-cream text-dark font-sans selection:bg-gold selection:text-white">
        <Navbar />
        <main className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
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
                You need to connect your wallet to join a squad.
              </p>
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
        <div className="max-w-4xl mx-auto">
          
          <div className="flex items-center justify-between mb-8">
            <Link href="/squads" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange transition">
              <ArrowLeft size={20} />
              Back to Squads
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-display">Find a Squad</h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Browse existing squads and join a team to increase your winning potential.
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 max-w-xl mx-auto">
              <AlertCircle className="text-red-500 mt-0.5" size={20} />
              <div>
                <p className="font-medium text-red-800">Error</p>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}

          {/* Join with Invite Code */}
          <div className="max-w-xl mx-auto mb-8">
            <button
              onClick={() => setShowInviteInput(!showInviteInput)}
              className="flex items-center gap-2 text-orange font-medium hover:underline mb-4"
            >
              <KeyRound size={16} />
              Have an invite code?
            </button>
            
            {showInviteInput && (
              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  className="flex-1 bg-white border border-gray-200 rounded-xl py-3 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange transition uppercase tracking-wider"
                  placeholder="Enter invite code"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                  maxLength={8}
                />
                <button
                  onClick={handleJoinWithCode}
                  disabled={joinLoading || !inviteCode.trim()}
                  className="px-6 py-3 bg-orange text-white font-bold rounded-xl hover:bg-orange/90 transition disabled:opacity-50"
                >
                  {joinLoading ? <Loader2 className="animate-spin" size={20} /> : 'Join'}
                </button>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-12">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full bg-white border border-gray-200 rounded-full py-4 pl-12 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange transition shadow-sm"
              placeholder="Search by squad name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-orange" size={40} />
            </div>
          ) : (
            <>
              {/* Squads Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSquads.map((squad) => {
                  const memberCount = squad.memberCount || 0;
                  const isFull = memberCount >= 5;
                  const isJoining = joiningSquadId === squad.id;
                  
                  return (
                    <div key={squad.id} className="glass-card p-6 flex flex-col justify-between hover:border-orange/30 transition group">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/30 to-orange/30 flex items-center justify-center text-xl font-bold">
                              {squad.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-dark group-hover:text-orange transition">{squad.name}</h3>
                              <p className="text-xs text-gray-500 font-medium">
                                Total Won: {formatCSPR(squad.totalWon || '0')} CSPR
                              </p>
                            </div>
                          </div>
                          {isFull ? (
                            <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                              <Lock size={10} /> FULL
                            </span>
                          ) : (
                            <span className="bg-green-100 text-green-600 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                              <Unlock size={10} /> OPEN
                            </span>
                          )}
                        </div>
                        
                        <div className="mb-6">
                          <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Members</span>
                            <span className="font-bold">{memberCount}/5</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${isFull ? 'bg-gray-400' : 'bg-orange'}`} 
                              style={{ width: `${(memberCount / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleJoin(squad.id)}
                        disabled={isFull || isJoining}
                        className={`w-full py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
                          isFull 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-dark text-white hover:bg-orange hover:shadow-lg'
                        }`}
                      >
                        {isJoining ? (
                          <>
                            <Loader2 className="animate-spin" size={18} />
                            Joining...
                          </>
                        ) : isFull ? (
                          'Squad Full'
                        ) : (
                          'Join Squad'
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {filteredSquads.length === 0 && !isLoading && (
                <div className="text-center py-12">
                  {searchTerm ? (
                    <>
                      <p className="text-gray-500 text-lg">No squads found matching "{searchTerm}"</p>
                      <button 
                        onClick={() => setSearchTerm('')}
                        className="text-orange font-bold mt-2 hover:underline"
                      >
                        Clear Search
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-500 text-lg mb-2">No squads available yet</p>
                      <Link href="/squads/create" className="text-orange font-bold hover:underline">
                        Create the first one!
                      </Link>
                    </>
                  )}
                </div>
              )}
            </>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
