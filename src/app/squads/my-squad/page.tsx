'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/Button';
import { ArrowLeft, Users, Copy, Share2, Trophy, MessageSquare, LogOut } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function MySquad() {
  const squad = {
    name: "The Moon Walkers",
    members: [
      { id: 1, name: "You", role: "Admin", winChance: "1 in 450", joined: "Just now" },
      { id: 2, name: "Alice.cspr", role: "Member", winChance: "1 in 450", joined: "2 days ago" },
      { id: 3, name: "Bob.cspr", role: "Member", winChance: "1 in 450", joined: "3 days ago" },
    ],
    totalWin: "0 CSPR",
    rank: "#142"
  };

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
                      {squad.name.charAt(0)}
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-dark">{squad.name}</h1>
                      <p className="text-gray-500 font-medium flex items-center gap-2">
                        <Trophy size={14} className="text-gold" />
                        Rank {squad.rank} • Total Won: {squad.totalWin}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition">
                      <Copy size={16} />
                      Copy Invite Link
                    </button>
                    <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition">
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
                  Squad Members ({squad.members.length}/5)
                </h3>
                
                <div className="space-y-4">
                  {squad.members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-white/60">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-dark flex items-center gap-2">
                            {member.name}
                            {member.role === 'Admin' && (
                              <span className="text-[10px] bg-orange/10 text-orange px-2 py-0.5 rounded-full uppercase tracking-wider">Admin</span>
                            )}
                          </p>
                          <p className="text-xs text-gray-500">Joined {member.joined}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-700">{member.winChance}</p>
                        <p className="text-[10px] text-gray-400 uppercase">Win Chance</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Empty Slots */}
                  {[...Array(5 - squad.members.length)].map((_, i) => (
                    <div key={`empty-${i}`} className="flex items-center justify-between p-4 border-2 border-dashed border-gray-300 rounded-xl">
                      <div className="flex items-center gap-3 opacity-50">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <Users size={16} className="text-gray-400" />
                        </div>
                        <span className="font-medium text-gray-400">Empty Slot</span>
                      </div>
                      <button className="text-sm font-bold text-orange hover:underline">
                        + Invite
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Chat & Actions */}
            <div className="space-y-8">
              
              {/* Squad Chat (Mock) */}
              <div className="glass-card p-6 h-[400px] flex flex-col">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <MessageSquare size={20} />
                  Squad Chat
                </h3>
                
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none text-sm text-gray-700 shadow-sm">
                      <p className="font-bold text-xs text-gray-400 mb-1">Alice.cspr</p>
                      Hey team! Just deposited another 500 CSPR. Let's win this week! 🚀
                    </div>
                  </div>
                  <div className="flex gap-2 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-orange/20 flex-shrink-0" />
                    <div className="bg-orange/10 p-3 rounded-2xl rounded-tr-none text-sm text-dark shadow-sm">
                      <p className="font-bold text-xs text-orange mb-1">You</p>
                      Nice one Alice! I'm feeling lucky about this round.
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Type a message..." 
                    className="w-full bg-white border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-orange transition"
                  />
                </div>
              </div>

              {/* Danger Zone */}
              <div className="p-6 rounded-xl border border-red-100 bg-red-50/50">
                <h4 className="font-bold text-red-600 mb-2">Danger Zone</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Leaving the squad will forfeit your bonus eligibility for the current round.
                </p>
                <button className="w-full py-2 border border-red-200 text-red-600 rounded-lg font-bold text-sm hover:bg-red-50 transition flex items-center justify-center gap-2">
                  <LogOut size={16} />
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
