'use client';

import { useState, useCallback } from 'react';
import { transactionAPI } from '@/services/api';
import { useWallet, toMotes } from '@/context/WalletContext';

export function useDeposit() {
  const { wallet, signDeploy } = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const deposit = useCallback(async (cspr: number): Promise<boolean> => {
    if (!wallet?.publicKey) {
      setError('Wallet not connected');
      return false;
    }

    if (cspr < 10) {
      setError('Minimum deposit is 10 CSPR');
      return false;
    }

    try {
      setLoading(true);
      setError(null);
      setTxHash(null);

      const amount = toMotes(cspr);

      // Step 1: Prepare deploy
      const prepareResponse = await transactionAPI.prepareDeposit(wallet.publicKey, amount);
      
      if (!prepareResponse.success || !prepareResponse.data) {
        setError(prepareResponse.error || 'Failed to prepare deposit');
        return false;
      }

      // Step 2: Sign deploy
      const signature = await signDeploy(prepareResponse.data.deploy);
      
      // Step 3: Submit and confirm
      // For now, we'll use a mock tx hash since actual submission requires more setup
      const mockTxHash = `${Date.now().toString(16)}${Math.random().toString(16).slice(2)}`.padEnd(64, '0');
      
      const confirmResponse = await transactionAPI.confirmDeposit(
        wallet.publicKey,
        amount,
        mockTxHash
      );

      if (confirmResponse.success) {
        setTxHash(mockTxHash);
        return true;
      } else {
        setError(confirmResponse.error || 'Failed to confirm deposit');
        return false;
      }
    } catch (err: any) {
      setError(err.message || 'Deposit failed');
      return false;
    } finally {
      setLoading(false);
    }
  }, [wallet, signDeploy]);

  const reset = useCallback(() => {
    setError(null);
    setTxHash(null);
  }, []);

  return { deposit, loading, error, txHash, reset };
}

export function useWithdraw() {
  const { wallet, signDeploy } = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [withdrawalId, setWithdrawalId] = useState<string | null>(null);

  const requestWithdraw = useCallback(async (cspr: number): Promise<boolean> => {
    if (!wallet?.publicKey) {
      setError('Wallet not connected');
      return false;
    }

    try {
      setLoading(true);
      setError(null);
      setWithdrawalId(null);

      const amount = toMotes(cspr);

      // Step 1: Prepare withdraw
      const prepareResponse = await transactionAPI.prepareWithdraw(wallet.publicKey, amount);
      
      if (!prepareResponse.success || !prepareResponse.data) {
        setError(prepareResponse.error || 'Failed to prepare withdrawal');
        return false;
      }

      // Step 2: Sign deploy
      await signDeploy(prepareResponse.data.deploy);
      
      // Step 3: Request withdrawal
      const withdrawResponse = await transactionAPI.requestWithdraw(wallet.publicKey, amount);

      if (withdrawResponse.success && withdrawResponse.data) {
        setWithdrawalId(withdrawResponse.data.id);
        return true;
      } else {
        setError(withdrawResponse.error || 'Failed to request withdrawal');
        return false;
      }
    } catch (err: any) {
      setError(err.message || 'Withdrawal request failed');
      return false;
    } finally {
      setLoading(false);
    }
  }, [wallet, signDeploy]);

  const claimWithdraw = useCallback(async (withdrawalId: string): Promise<boolean> => {
    if (!wallet?.publicKey) {
      setError('Wallet not connected');
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const claimResponse = await transactionAPI.claimWithdraw(wallet.publicKey, withdrawalId);

      if (claimResponse.success) {
        return true;
      } else {
        setError(claimResponse.error || 'Failed to claim withdrawal');
        return false;
      }
    } catch (err: any) {
      setError(err.message || 'Claim failed');
      return false;
    } finally {
      setLoading(false);
    }
  }, [wallet]);

  const reset = useCallback(() => {
    setError(null);
    setWithdrawalId(null);
  }, []);

  return { requestWithdraw, claimWithdraw, loading, error, withdrawalId, reset };
}
