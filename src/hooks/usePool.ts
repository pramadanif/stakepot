'use client';

import { useState, useEffect, useCallback } from 'react';
import { poolAPI, PoolStats, CurrentRound, Draw, Winner } from '@/services/api';

export function usePoolStats() {
  const [stats, setStats] = useState<PoolStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await poolAPI.getStats();
      if (response.success && response.data) {
        setStats(response.data);
        setError(null);
      } else {
        setError(response.error || 'Failed to fetch pool stats');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    // Refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
}

export function useCurrentRound() {
  const [round, setRound] = useState<CurrentRound | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRound = useCallback(async () => {
    try {
      setLoading(true);
      const response = await poolAPI.getCurrentRound();
      if (response.success && response.data) {
        setRound(response.data);
        setError(null);
      } else {
        setError(response.error || 'Failed to fetch current round');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRound();
    // Refresh every 10 seconds for countdown
    const interval = setInterval(fetchRound, 10000);
    return () => clearInterval(interval);
  }, [fetchRound]);

  return { round, loading, error, refetch: fetchRound };
}

export function useDrawHistory(page: number = 1, limit: number = 10) {
  const [draws, setDraws] = useState<Draw[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDraws = useCallback(async () => {
    try {
      setLoading(true);
      const response = await poolAPI.getDraws(page, limit);
      if (response.success && response.data) {
        setDraws(response.data);
        setPagination(response.pagination);
        setError(null);
      } else {
        setError(response.error || 'Failed to fetch draws');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchDraws();
  }, [fetchDraws]);

  return { draws, pagination, loading, error, refetch: fetchDraws };
}

export function useWinners(page: number = 1, limit: number = 10) {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWinners = useCallback(async () => {
    try {
      setLoading(true);
      const response = await poolAPI.getWinners(page, limit);
      if (response.success && response.data) {
        setWinners(response.data);
        setPagination(response.pagination);
        setError(null);
      } else {
        setError(response.error || 'Failed to fetch winners');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchWinners();
  }, [fetchWinners]);

  return { winners, pagination, loading, error, refetch: fetchWinners };
}

// Countdown hook
export function useCountdown(targetDate: string | Date | null) {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
  });

  useEffect(() => {
    if (!targetDate) return;

    const target = new Date(targetDate).getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        total: diff,
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return countdown;
}
