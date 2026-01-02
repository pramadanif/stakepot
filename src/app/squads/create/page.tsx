'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/Button';
import { ArrowLeft, ShieldCheck, Sparkles, AlertCircle, Wallet, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/context/WalletContext';
import { useSquadActions } from '@/hooks/useSquad';

export default function CreateSquad() {
  const router = useRouter();
  const [squadName, setSquadName] = useState('');
  
  const { wallet } = useWallet();
  const { createSquad, loading: isLoading, error } = useSquadActions();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!squadName.trim() || !wallet?.address) return;
    
    const squad = await createSquad(squadName.trim());
    if (squad) {
      router.push('/squads/my-squad');
    }
  };

  // Not connected state
  if (!wallet?.isConnected) {
    return (
      <div className="min-h-screen bg-cream text-dark font-sans selection:bg-gold selection:text-white">
        <Navbar />
        <main className="pt-32 pb-20 px-4">
          <div className="max-w-2xl mx-auto">
            <Link href="/squads" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange mb-8 transition">
              <ArrowLeft size={20} />
              Back to Squads
            </Link>
            
            <div className="glass-card p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-orange/10 flex items-center justify-center mx-auto mb-6">
                <Wallet size={40} className="text-orange" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Connect Your Wallet</h2>
              <p className="text-gray-600 mb-6">
                You need to connect your wallet to create a squad.
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
        <div className="max-w-2xl mx-auto">
          
          <Link href="/squads" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange mb-8 transition">
            <ArrowLeft size={20} />
            Back to Squads
          </Link>

          <div className="glass-card p-8 md:p-12">
            <div className="text-center mb-10">
              <div className="w-16 h-16 mx-auto bg-gold/20 rounded-2xl flex items-center justify-center text-gold mb-6">
                <Sparkles size={32} />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 font-display">Create Your Squad</h1>
              <p className="text-gray-600">
                Start a new team, invite friends, and multiply your winning chances together.
              </p>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="text-red-500 mt-0.5" size={20} />
                <div>
                  <p className="font-medium text-red-800">Error</p>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleCreate} className="space-y-6">
              <div>
                <label htmlFor="squadName" className="block text-sm font-medium text-gray-700 mb-2">
                  Squad Name
                </label>
                <input
                  type="text"
                  id="squadName"
                  value={squadName}
                  onChange={(e) => setSquadName(e.target.value)}
                  placeholder="e.g. The Moon Walkers"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange transition"
                  maxLength={30}
                  required
                  disabled={isLoading}
                />
                <p className="mt-2 text-xs text-gray-500">
                  Choose a unique name for your team (max 30 characters). You can change this later.
                </p>
              </div>

              <div className="bg-orange/5 border border-orange/10 rounded-xl p-4 flex gap-4 items-start">
                <ShieldCheck className="w-6 h-6 text-orange shrink-0 mt-1" />
                <div className="text-sm text-gray-600">
                  <p className="font-bold text-dark mb-1">Squad Rules</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Maximum 5 members per squad.</li>
                    <li>5% bonus is distributed equally among non-winning members.</li>
                    <li>Squad creator becomes the admin.</li>
                    <li>An invite code will be generated for you to share.</li>
                  </ul>
                </div>
              </div>

              <Button 
                variant="primary" 
                className="w-full py-4 text-lg" 
                icon
                disabled={isLoading || !squadName.trim()}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" size={20} />
                    Creating Squad...
                  </span>
                ) : (
                  'Create Squad'
                )}
              </Button>
            </form>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
