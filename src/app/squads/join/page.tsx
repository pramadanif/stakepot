'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/Button';
import { ArrowLeft, Search, Users, Lock, Unlock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function JoinSquad() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const squads = [
    { id: 1, name: "CryptoWhales", members: 4, maxMembers: 5, totalWin: "12,500 CSPR", status: 'open' },
    { id: 2, name: "CasperKnights", members: 5, maxMembers: 5, totalWin: "8,200 CSPR", status: 'full' },
    { id: 3, name: "LuckyCharm", members: 3, maxMembers: 5, totalWin: "5,100 CSPR", status: 'open' },
    { id: 4, name: "MoonShot", members: 2, maxMembers: 5, totalWin: "2,400 CSPR", status: 'open' },
    { id: 5, name: "HODLers", members: 5, maxMembers: 5, totalWin: "15,000 CSPR", status: 'full' },
    { id: 6, name: "AlphaTeam", members: 1, maxMembers: 5, totalWin: "0 CSPR", status: 'open' },
  ];

  const filteredSquads = squads.filter(squad => 
    squad.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoin = (squadId: number) => {
    // Simulate join action
    router.push('/squads/my-squad');
  };

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

          {/* Squads Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSquads.map((squad) => (
              <div key={squad.id} className="glass-card p-6 flex flex-col justify-between hover:border-orange/30 transition group">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xl">
                        {squad.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-dark group-hover:text-orange transition">{squad.name}</h3>
                        <p className="text-xs text-gray-500 font-medium">Total Won: {squad.totalWin}</p>
                      </div>
                    </div>
                    {squad.status === 'full' ? (
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
                      <span className="font-bold">{squad.members}/{squad.maxMembers}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${squad.status === 'full' ? 'bg-gray-400' : 'bg-orange'}`} 
                        style={{ width: `${(squad.members / squad.maxMembers) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => handleJoin(squad.id)}
                  disabled={squad.status === 'full'}
                  className={`w-full py-3 rounded-xl font-bold transition ${
                    squad.status === 'full' 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-dark text-white hover:bg-orange hover:shadow-lg'
                  }`}
                >
                  {squad.status === 'full' ? 'Squad Full' : 'Join Squad'}
                </button>
              </div>
            ))}
          </div>

          {filteredSquads.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No squads found matching "{searchTerm}"</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="text-orange font-bold mt-2 hover:underline"
              >
                Clear Search
              </button>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
