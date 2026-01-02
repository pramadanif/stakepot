'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './Button';
import { useWallet, formatAddress, formatCSPR } from '@/context/WalletContext';
import { Wallet, LogOut, ChevronDown, Copy, ExternalLink, Check } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const { wallet, isConnecting, connect, disconnect } = useWallet();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showDropdown && !(e.target as Element).closest('.wallet-dropdown')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showDropdown]);

  const copyAddress = () => {
    if (wallet?.address) {
      navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
      <div className={`max-w-6xl mx-auto mx-4 px-6 py-3 rounded-full flex justify-between items-center transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg border border-white/40' : 'bg-transparent'}`}>
        
        <Link href="/" className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-orange flex items-center justify-center text-white font-bold text-lg">
             S
           </div>
           <span className="font-bold text-xl text-dark tracking-tight">StakePot</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/dashboard" className="hover:text-orange transition">Dashboard</Link>
          <Link href="/prizes" className="hover:text-orange transition">Prizes</Link>
          <Link href="/squads" className="hover:text-orange transition">Squads</Link>
          <Link href="/faq" className="hover:text-orange transition">FAQ</Link>
        </div>

        {/* Wallet Connection */}
        {wallet?.isConnected ? (
          <div className="relative wallet-dropdown">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 hover:border-orange/30 transition shadow-sm"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gold to-orange flex items-center justify-center">
                <Wallet size={12} className="text-white" />
              </div>
              <span className="font-medium text-sm text-dark">
                {formatAddress(wallet.address, 4)}
              </span>
              <ChevronDown size={14} className={`text-gray-400 transition ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Balance */}
                <div className="p-4 bg-gradient-to-r from-gold/10 to-orange/10 border-b border-gray-100">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Your Balance</p>
                  <p className="text-2xl font-bold text-dark">
                    {formatCSPR(wallet.balance)} <span className="text-sm font-normal text-gray-500">CSPR</span>
                  </p>
                </div>

                {/* Address */}
                <div className="p-4 border-b border-gray-100">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Wallet Address</p>
                  <div className="flex items-center gap-2">
                    <code className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded flex-1 overflow-hidden text-ellipsis">
                      {formatAddress(wallet.address, 8)}
                    </code>
                    <button
                      onClick={copyAddress}
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition"
                      title="Copy address"
                    >
                      {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-gray-400" />}
                    </button>
                    <a
                      href={`https://testnet.cspr.live/account/${wallet.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition"
                      title="View on explorer"
                    >
                      <ExternalLink size={14} className="text-gray-400" />
                    </a>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-2">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition"
                    onClick={() => setShowDropdown(false)}
                  >
                    <Wallet size={16} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      disconnect();
                      setShowDropdown(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-red-50 rounded-lg transition text-red-600"
                  >
                    <LogOut size={16} />
                    <span className="text-sm font-medium">Disconnect</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Button 
            variant="primary" 
            className="!px-5 !py-2 !text-sm"
            onClick={connect}
          >
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </Button>
        )}
      </div>
    </nav>
  );
};
