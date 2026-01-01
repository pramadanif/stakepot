'use client';

import React from 'react';
import { Twitter, Heart, MessageCircle } from 'lucide-react';
import { SocialCard } from '@/types';

const tweets: SocialCard[] = [
  {
    id: '1',
    username: 'CryptoDegen',
    handle: '@cryptodegen',
    avatar: 'https://picsum.photos/50/50?random=10',
    content: "Just joined StakePot. This week's jackpot is 5,000 CSPR 🔥 Can't lose my principal so it's a no brainer.",
    likes: '1.2k'
  },
  {
    id: '2',
    username: 'Web3Sarah',
    handle: '@web3sarah',
    avatar: 'https://picsum.photos/50/50?random=11',
    content: 'The Squad feature is genius. My friend won last week and I still got a bonus airdrop! 💸',
    likes: '892'
  },
  {
    id: '3',
    username: 'CasperWhale',
    handle: '@cspr_whale',
    avatar: 'https://picsum.photos/50/50?random=12',
    content: 'Finally a use case for staking that is actually fun. Parking my bag here for the year.',
    likes: '2.4k'
  }
];

export const SocialProof: React.FC = () => {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-dark">Join the Community</h2>
        <p className="text-gray-600">Thousands are already playing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tweets.map((tweet) => (
          <div key={tweet.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <img src={tweet.avatar} alt={tweet.username} className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-bold text-dark">{tweet.username}</p>
                <p className="text-gray-400 text-sm">{tweet.handle}</p>
              </div>
              <Twitter className="w-5 h-5 text-blue-400 ml-auto" />
            </div>
            <p className="text-gray-700 mb-4">{tweet.content}</p>
            <div className="flex items-center gap-6 text-gray-400 text-sm">
              <div className="flex items-center gap-1 group cursor-pointer hover:text-red-500">
                <Heart className="w-4 h-4" />
                <span>{tweet.likes}</span>
              </div>
              <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
                <MessageCircle className="w-4 h-4" />
                <span>Reply</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-10 gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-[#1DA1F2] text-white rounded-full font-bold hover:bg-opacity-90 transition">
              <Twitter className="w-5 h-5" /> Share on X
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#229ED9] text-white rounded-full font-bold hover:bg-opacity-90 transition">
              Join Telegram
          </button>
      </div>
    </section>
  );
};
