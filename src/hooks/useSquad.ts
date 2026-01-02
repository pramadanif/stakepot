'use client';

import { useState, useEffect, useCallback } from 'react';
import { squadAPI, Squad } from '@/services/api';
import { useWallet } from '@/context/WalletContext';

export function useSquads(page: number = 1, limit: number = 10, query: string = '', status: string = 'all') {
  const [squads, setSquads] = useState<Squad[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSquads = useCallback(async () => {
    try {
      setLoading(true);
      const response = await squadAPI.getSquads(page, limit, query, status);
      if (response.success && response.data) {
        setSquads(response.data);
        setPagination(response.pagination);
        setError(null);
      } else {
        setError(response.error || 'Failed to fetch squads');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, limit, query, status]);

  useEffect(() => {
    fetchSquads();
  }, [fetchSquads]);

  return { squads, pagination, loading, error, refetch: fetchSquads };
}

export function useTopSquads(limit: number = 10) {
  const [squads, setSquads] = useState<Squad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSquads = useCallback(async () => {
    try {
      setLoading(true);
      const response = await squadAPI.getTopSquads(limit);
      if (response.success && response.data) {
        setSquads(response.data);
        setError(null);
      } else {
        setError(response.error || 'Failed to fetch top squads');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchSquads();
  }, [fetchSquads]);

  return { squads, loading, error, refetch: fetchSquads };
}

export function useSquad(id: string | null) {
  const [squad, setSquad] = useState<Squad | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSquad = useCallback(async () => {
    if (!id) {
      setSquad(null);
      return;
    }

    try {
      setLoading(true);
      const response = await squadAPI.getSquad(id);
      if (response.success && response.data) {
        setSquad(response.data);
        setError(null);
      } else {
        setError(response.error || 'Squad not found');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchSquad();
  }, [fetchSquad]);

  return { squad, loading, error, refetch: fetchSquad };
}

export function useMySquad() {
  const { wallet } = useWallet();
  const [squad, setSquad] = useState<Squad | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMySquad = useCallback(async () => {
    if (!wallet?.publicKey) {
      setSquad(null);
      return;
    }

    try {
      setLoading(true);
      // Get user first to find their squad
      const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/users/${wallet.publicKey}`);
      const userData = await userResponse.json();
      
      if (userData.success && userData.data?.squad) {
        setSquad(userData.data.squad);
        setError(null);
      } else {
        setSquad(null);
      }
    } catch (err: any) {
      setError(err.message);
      setSquad(null);
    } finally {
      setLoading(false);
    }
  }, [wallet?.publicKey]);

  useEffect(() => {
    fetchMySquad();
  }, [fetchMySquad]);

  return { squad, loading, error, refetch: fetchMySquad };
}

export function useSquadActions() {
  const { wallet } = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSquad = useCallback(async (name: string): Promise<Squad | null> => {
    if (!wallet?.publicKey) {
      setError('Wallet not connected');
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await squadAPI.createSquad(wallet.publicKey, name);
      
      if (response.success && response.data) {
        return response.data;
      } else {
        setError(response.error || 'Failed to create squad');
        return null;
      }
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [wallet?.publicKey]);

  const joinSquad = useCallback(async (inviteCode: string): Promise<Squad | null> => {
    if (!wallet?.publicKey) {
      setError('Wallet not connected');
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await squadAPI.joinSquad(wallet.publicKey, inviteCode);
      
      if (response.success && response.data) {
        return response.data;
      } else {
        setError(response.error || 'Failed to join squad');
        return null;
      }
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [wallet?.publicKey]);

  const leaveSquad = useCallback(async (): Promise<boolean> => {
    if (!wallet?.publicKey) {
      setError('Wallet not connected');
      return false;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await squadAPI.leaveSquad(wallet.publicKey);
      
      if (response.success) {
        return true;
      } else {
        setError(response.error || 'Failed to leave squad');
        return false;
      }
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [wallet?.publicKey]);

  return { createSquad, joinSquad, leaveSquad, loading, error };
}
