'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/Button';
import { Users, Trophy, ShieldCheck, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function SquadDetails() {
  const params = useParams();
  // In a real app, fetch squad details using params.id
  const squad = {
    id: params.id,
    name: "CryptoWhales",
    rank: 1,
    members: 4,
    maxMembers: 5,
    totalWin: "12,500 CSPR",
    description: "We are a group of long-term CSPR holders. Join us to maximize your winning chances! Active players only.",
    isFull: false
  };

  return (
    <div className="min-h-screen bg-cream text-dark font-sans selection:bg-gold selection:text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          
          <Link href="/squads/join" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange mb-8 transition">
            <ArrowLeft size={20} />
            Back to Find Squad
          </Link>

          <div className="glass-card overflow-hidden">
            {/* Header Banner */}
            <div className="bg-dark p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/20 rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-gold to-orange flex items-center justify-center text-white text-4xl font-bold shadow-2xl border-4 border-white/10">
                    {squad.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl md:text-4xl font-bold">{squad.name}</h1>
                      <span className="bg-gold text-dark text-xs font-bold px-2 py-1 rounded-md uppercase">
                        Rank #{squad.rank}
                      </span>
                    </div>
                    <p className="text-gray-300 flex items-center gap-2">
                      <Trophy size={16} className="text-gold" />
                      Total Won: <span className="text-white font-bold">{squad.totalWin}</span>
                    </p>
                  </div>
                </div>

                <button className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition" title="Share Squad">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                
                <div className="md:col-span-2 space-y-8">
                  <div>
                    <h3 className="text-lg font-bold mb-3 text-dark">About Squad</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {squad.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-4 text-dark flex items-center gap-2">
                      <Users size={20} />
                      Members ({squad.members}/{squad.maxMembers})
                    </h3>
                    <div className="space-y-3">
                      {[...Array(squad.members)].map((_, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                            U{i+1}
                          </div>
                          <span className="font-medium text-gray-700">User_0x{i+1}...</span>
                          {i === 0 && <span className="text-[10px] bg-orange/10 text-orange px-2 py-0.5 rounded-full uppercase font-bold">Admin</span>}
                        </div>
                      ))}
                      {!squad.isFull && (
                        <div className="flex items-center gap-3 p-3 border-2 border-dashed border-gray-200 rounded-xl opacity-60">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <Users size={14} className="text-gray-400" />
                          </div>
                          <span className="font-medium text-gray-400">Open Slot</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-1">
                  <div className="bg-orange/5 rounded-2xl p-6 border border-orange/10">
                    <h3 className="font-bold text-dark mb-4 flex items-center gap-2">
                      <ShieldCheck size={18} className="text-orange" />
                      Squad Benefits
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-600 mb-8">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 font-bold">✓</span>
                        5% Bonus on wins
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 font-bold">✓</span>
                        Shared luck pool
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 font-bold">✓</span>
                        Team chat access
                      </li>
                    </ul>

                    <Button 
                      variant="primary" 
                      className="w-full text-base"
                      onClick={() => alert('Joined successfully!')}
                    >
                      Join Squad
                    </Button>
                    <p className="text-xs text-center text-gray-400 mt-3">
                      No entry fee required
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
