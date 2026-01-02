'use client';

import { useState, useEffect, useCallback } from 'react';
import { userAPI, User, Transaction, Withdrawal } from '@/services/api';
import { useWallet } from '@/context/WalletContext';

export function useUser() {
  const { wallet } = useWallet();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    if (!wallet?.publicKey) {
      setUser(null);
      return;
    }

    try {
      setLoading(true);
      const response = await userAPI.getUser(wallet.publicKey);
      if (response.success && response.data) {
        setUser(response.data);
        setError(null);
      } else {
        // User might not exist yet
        setUser(null);
      }
    } catch (err: any) {
      setError(err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [wallet?.publicKey]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, loading, error, refetch: fetchUser };
}

export function useUserTransactions(page: number = 1, limit: number = 10) {
  const { wallet } = useWallet();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    if (!wallet?.publicKey) {
      setTransactions([]);
      return;
    }

    try {
      setLoading(true);
      const response = await userAPI.getTransactions(wallet.publicKey, page, limit);
      if (response.success && response.data) {
        setTransactions(response.data);
        setPagination(response.pagination);
        setError(null);
      } else {
        setError(response.error || 'Failed to fetch transactions');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [wallet?.publicKey, page, limit]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { transactions, pagination, loading, error, refetch: fetchTransactions };
}

export function useUserWithdrawals(page: number = 1, limit: number = 10) {
  const { wallet } = useWallet();
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWithdrawals = useCallback(async () => {
    if (!wallet?.publicKey) {
      setWithdrawals([]);
      return;
    }

    try {
      setLoading(true);
      const response = await userAPI.getWithdrawals(wallet.publicKey, page, limit);
      if (response.success && response.data) {
        setWithdrawals(response.data);
        setPagination(response.pagination);
        setError(null);
      } else {
        setError(response.error || 'Failed to fetch withdrawals');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [wallet?.publicKey, page, limit]);

  useEffect(() => {
    fetchWithdrawals();
  }, [fetchWithdrawals]);

  return { withdrawals, pagination, loading, error, refetch: fetchWithdrawals };
}
