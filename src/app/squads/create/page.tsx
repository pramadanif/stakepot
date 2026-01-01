'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/Button';
import { ArrowLeft, Users, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreateSquad() {
  const router = useRouter();
  const [squadName, setSquadName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    // Simulate API call
    setTimeout(() => {
      setIsCreating(false);
      router.push('/squads/my-squad'); // Redirect to the new squad page
    }, 1500);
  };

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
                  required
                />
                <p className="mt-2 text-xs text-gray-500">
                  Choose a unique name for your team. You can change this later.
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
                  </ul>
                </div>
              </div>

              <Button variant="primary" className="w-full py-4 text-lg" icon>
                {isCreating ? 'Creating Squad...' : 'Create Squad'}
              </Button>
            </form>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
