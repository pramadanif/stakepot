'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

// Types
export interface WalletInfo {
  publicKey: string;
  address: string;
  balance: string;
  isConnected: boolean;
  isLocked: boolean;
}

export interface WalletContextType {
  wallet: WalletInfo | null;
  isConnecting: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  signDeploy: (deploy: any) => Promise<string>;
  getBalance: () => Promise<string>;
}

const defaultWallet: WalletInfo = {
  publicKey: '',
  address: '',
  balance: '0',
  isConnected: false,
  isLocked: true,
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Check if Casper Wallet extension is available
const getCasperWallet = (): any => {
  if (typeof window !== 'undefined') {
    return (window as any).CasperWalletProvider?.();
  }
  return null;
};

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check wallet connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      const casperWallet = getCasperWallet();
      if (!casperWallet) return;

      try {
        const isConnected = await casperWallet.isConnected();
        if (isConnected) {
          const activeKey = await casperWallet.getActivePublicKey();
          if (activeKey) {
            setWallet({
              publicKey: activeKey,
              address: activeKey,
              balance: '0',
              isConnected: true,
              isLocked: false,
            });
            // Fetch balance
            fetchBalance(activeKey);
          }
        }
      } catch (err) {
        console.error('Error checking wallet connection:', err);
      }
    };

    checkConnection();
  }, []);

  // Listen for wallet events
  useEffect(() => {
    const casperWallet = getCasperWallet();
    if (!casperWallet) return;

    const handleConnected = (event: any) => {
      console.log('Wallet connected event:', event);
      if (event.detail?.activeKey) {
        setWallet({
          publicKey: event.detail.activeKey,
          address: event.detail.activeKey,
          balance: '0',
          isConnected: true,
          isLocked: false,
        });
        fetchBalance(event.detail.activeKey);
      }
    };

    const handleDisconnected = () => {
      console.log('Wallet disconnected');
      setWallet(null);
    };

    const handleActiveKeyChanged = (event: any) => {
      console.log('Active key changed:', event);
      if (event.detail?.activeKey) {
        setWallet(prev => prev ? {
          ...prev,
          publicKey: event.detail.activeKey,
          address: event.detail.activeKey,
        } : null);
        fetchBalance(event.detail.activeKey);
      }
    };

    const handleLocked = () => {
      setWallet(prev => prev ? { ...prev, isLocked: true } : null);
    };

    const handleUnlocked = () => {
      setWallet(prev => prev ? { ...prev, isLocked: false } : null);
    };

    // Subscribe to events
    window.addEventListener('casper-wallet:connected', handleConnected);
    window.addEventListener('casper-wallet:disconnected', handleDisconnected);
    window.addEventListener('casper-wallet:activeKeyChanged', handleActiveKeyChanged);
    window.addEventListener('casper-wallet:locked', handleLocked);
    window.addEventListener('casper-wallet:unlocked', handleUnlocked);

    return () => {
      window.removeEventListener('casper-wallet:connected', handleConnected);
      window.removeEventListener('casper-wallet:disconnected', handleDisconnected);
      window.removeEventListener('casper-wallet:activeKeyChanged', handleActiveKeyChanged);
      window.removeEventListener('casper-wallet:locked', handleLocked);
      window.removeEventListener('casper-wallet:unlocked', handleUnlocked);
    };
  }, []);

  const fetchBalance = async (publicKey: string) => {
    try {
      const response = await fetch(`/api/users/${publicKey}`);
      if (response.ok) {
        const data = await response.json();
        setWallet(prev => prev ? {
          ...prev,
          balance: data.data?.ticketBalance || '0',
        } : null);
      }
    } catch (err) {
      console.error('Error fetching balance:', err);
    }
  };

  const connect = useCallback(async () => {
    const casperWallet = getCasperWallet();
    
    if (!casperWallet) {
      setError('Please install Casper Wallet extension');
      window.open('https://www.casperwallet.io/', '_blank');
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      // Request connection
      const connected = await casperWallet.requestConnection();
      
      if (connected) {
        const activeKey = await casperWallet.getActivePublicKey();
        
        if (activeKey) {
          setWallet({
            publicKey: activeKey,
            address: activeKey,
            balance: '0',
            isConnected: true,
            isLocked: false,
          });
          
          // Fetch balance
          fetchBalance(activeKey);
          
          // Register user in backend
          await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              walletAddress: activeKey,
              publicKey: activeKey,
            }),
          });
        }
      } else {
        setError('Connection rejected');
      }
    } catch (err: any) {
      console.error('Connection error:', err);
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    const casperWallet = getCasperWallet();
    
    if (casperWallet) {
      try {
        await casperWallet.disconnectFromSite();
      } catch (err) {
        console.error('Disconnect error:', err);
      }
    }
    
    setWallet(null);
    setError(null);
  }, []);

  const signDeploy = useCallback(async (deploy: any): Promise<string> => {
    const casperWallet = getCasperWallet();
    
    if (!casperWallet) {
      throw new Error('Wallet not available');
    }

    if (!wallet?.isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      // Sign the deploy
      const signedDeploy = await casperWallet.sign(
        JSON.stringify(deploy),
        wallet.publicKey
      );

      if (signedDeploy.cancelled) {
        throw new Error('Signing cancelled by user');
      }

      return signedDeploy.signature;
    } catch (err: any) {
      console.error('Signing error:', err);
      throw new Error(err.message || 'Failed to sign deploy');
    }
  }, [wallet]);

  const getBalance = useCallback(async (): Promise<string> => {
    if (!wallet?.publicKey) return '0';
    
    try {
      const response = await fetch(`/api/users/${wallet.publicKey}`);
      if (response.ok) {
        const data = await response.json();
        const balance = data.data?.ticketBalance || '0';
        setWallet(prev => prev ? { ...prev, balance } : null);
        return balance;
      }
    } catch (err) {
      console.error('Error getting balance:', err);
    }
    
    return wallet.balance || '0';
  }, [wallet]);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        isConnecting,
        error,
        connect,
        disconnect,
        signDeploy,
        getBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet(): WalletContextType {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}

// Utility function to format address
export function formatAddress(address: string, chars: number = 6): string {
  if (!address) return '';
  if (address.length <= chars * 2) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

// Utility function to format CSPR amount
export function formatCSPR(motes: string | bigint, decimals: number = 2): string {
  const value = typeof motes === 'string' ? BigInt(motes) : motes;
  const cspr = Number(value) / 1_000_000_000;
  return cspr.toLocaleString(undefined, { 
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals 
  });
}

// Convert CSPR to motes
export function toMotes(cspr: number | string): string {
  const value = typeof cspr === 'string' ? parseFloat(cspr) : cspr;
  return BigInt(Math.floor(value * 1_000_000_000)).toString();
}

// Convert motes to CSPR
export function fromMotes(motes: string | bigint): number {
  const value = typeof motes === 'string' ? BigInt(motes) : motes;
  return Number(value) / 1_000_000_000;
}
