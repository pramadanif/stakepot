const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Generic fetch wrapper
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; error?: string; pagination?: any }> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }

    return data;
  } catch (error: any) {
    console.error(`API Error [${endpoint}]:`, error);
    return { success: false, error: error.message };
  }
}

// ============ POOL API ============

export interface PoolStats {
  totalDeposited: string;
  totalTickets: string;
  totalParticipants: number;
  totalSquads: number;
  currentRound: number;
  accumulatedYield: string;
  totalPrizesDistributed: string;
  nextDrawTime: string;
  formatted: {
    totalDeposited: string;
    accumulatedYield: string;
    totalPrizesDistributed: string;
    timeUntilDraw: string;
  };
}

export interface CurrentRound {
  round: number;
  estimatedPrize: string;
  formattedPrize: string;
  totalPool: string;
  formattedPool: string;
  participantCount: number;
  nextDrawTime: string;
  countdown: {
    total: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

export interface Draw {
  id: string;
  round: number;
  totalPool: string;
  prizeAmount: string;
  winnerAddress: string | null;
  squadBonus: string;
  participantCount: number;
  status: string;
  executedAt: string | null;
  formatted: {
    prizeAmount: string;
    totalPool: string;
    winnerAddress: string;
  };
}

export interface Winner {
  round: number;
  address: string;
  fullAddress: string;
  amount: string;
  formattedAmount: string;
  date: string;
}

export const poolAPI = {
  getStats: () => fetchAPI<PoolStats>('/pool/stats'),
  
  getCurrentRound: () => fetchAPI<CurrentRound>('/pool/current-round'),
  
  getDraws: (page = 1, limit = 10) => 
    fetchAPI<Draw[]>(`/pool/draws?page=${page}&limit=${limit}`),
  
  getDraw: (round: number) => fetchAPI<Draw>(`/pool/draws/${round}`),
  
  getWinners: (page = 1, limit = 10) => 
    fetchAPI<Winner[]>(`/pool/winners?page=${page}&limit=${limit}`),
};

// ============ USER API ============

export interface User {
  id: string;
  walletAddress: string;
  depositedAmount: string;
  ticketBalance: string;
  pendingWithdraw: string;
  totalWinnings: string;
  squadId: string | null;
  squad: Squad | null;
  winChance: {
    tickets: string;
    total: string;
    odds: string;
  } | null;
}

export interface Transaction {
  id: string;
  txHash: string;
  type: 'DEPOSIT' | 'WITHDRAW_REQUEST' | 'WITHDRAW_CLAIM' | 'PRIZE_WIN' | 'SQUAD_BONUS';
  amount: string;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED';
  createdAt: string;
}

export interface Withdrawal {
  id: string;
  amount: string;
  status: 'PENDING' | 'UNBONDING' | 'AVAILABLE' | 'CLAIMED' | 'FAILED';
  requestedAt: string;
  availableAt: string;
  claimedAt: string | null;
}

export const userAPI = {
  getUser: (address: string) => fetchAPI<User>(`/users/${address}`),
  
  createUser: (walletAddress: string, publicKey?: string) => 
    fetchAPI<User>('/users', {
      method: 'POST',
      body: JSON.stringify({ walletAddress, publicKey }),
    }),
  
  getTransactions: (address: string, page = 1, limit = 10) =>
    fetchAPI<Transaction[]>(`/users/${address}/transactions?page=${page}&limit=${limit}`),
  
  getWithdrawals: (address: string, page = 1, limit = 10) =>
    fetchAPI<Withdrawal[]>(`/users/${address}/withdrawals?page=${page}&limit=${limit}`),
  
  getPrizes: (address: string) =>
    fetchAPI<any[]>(`/users/${address}/prizes`),
};

// ============ SQUAD API ============

export interface Squad {
  id: string;
  onChainId: number;
  name: string;
  inviteCode: string;
  memberCount: number;
  totalWins: number;
  totalWon: string;
  rank: number;
  adminId: string;
  isActive: boolean;
  status: 'open' | 'full';
  squadMembers?: SquadMember[];
}

export interface SquadMember {
  id: string;
  userId: string;
  role: number;
  ticketsAtJoin: string;
  joinedAt: string;
  user: {
    walletAddress: string;
    ticketBalance: string;
  };
}

export const squadAPI = {
  getSquads: (page = 1, limit = 10, query = '', status = 'all') =>
    fetchAPI<Squad[]>(`/squads?page=${page}&limit=${limit}&query=${query}&status=${status}`),
  
  getTopSquads: (limit = 10) =>
    fetchAPI<Squad[]>(`/squads/top?limit=${limit}`),
  
  getSquad: (id: string) => fetchAPI<Squad>(`/squads/${id}`),
  
  getSquadByInvite: (code: string) => 
    fetchAPI<Squad>(`/squads/invite/${code}`),
  
  createSquad: (walletAddress: string, name: string) =>
    fetchAPI<Squad>('/squads', {
      method: 'POST',
      body: JSON.stringify({ walletAddress, name }),
    }),
  
  joinSquad: (walletAddress: string, inviteCode: string) =>
    fetchAPI<Squad>('/squads/join', {
      method: 'POST',
      body: JSON.stringify({ walletAddress, inviteCode }),
    }),
  
  leaveSquad: (walletAddress: string) =>
    fetchAPI<void>('/squads/leave', {
      method: 'POST',
      body: JSON.stringify({ walletAddress }),
    }),
};

// ============ TRANSACTION API ============

export interface DeployData {
  deploy: any;
  amount: string;
  walletAddress: string;
}

export interface WithdrawPrepareData extends DeployData {
  availableAt: string;
  unbondingDays: number;
}

export const transactionAPI = {
  prepareDeposit: (walletAddress: string, amount: string) =>
    fetchAPI<DeployData>('/transactions/deposit/prepare', {
      method: 'POST',
      body: JSON.stringify({ walletAddress, amount, txHash: '' }),
    }),
  
  confirmDeposit: (walletAddress: string, amount: string, txHash: string) =>
    fetchAPI<any>('/transactions/deposit/confirm', {
      method: 'POST',
      body: JSON.stringify({ walletAddress, amount, txHash }),
    }),
  
  prepareWithdraw: (walletAddress: string, amount: string) =>
    fetchAPI<WithdrawPrepareData>('/transactions/withdraw/prepare', {
      method: 'POST',
      body: JSON.stringify({ walletAddress, amount }),
    }),
  
  requestWithdraw: (walletAddress: string, amount: string) =>
    fetchAPI<Withdrawal>('/transactions/withdraw/request', {
      method: 'POST',
      body: JSON.stringify({ walletAddress, amount }),
    }),
  
  claimWithdraw: (walletAddress: string, withdrawalId: string) =>
    fetchAPI<any>('/transactions/withdraw/claim', {
      method: 'POST',
      body: JSON.stringify({ walletAddress, withdrawalId }),
    }),
  
  getTransaction: (txHash: string) =>
    fetchAPI<Transaction>(`/transactions/${txHash}`),
};

export default {
  pool: poolAPI,
  user: userAPI,
  squad: squadAPI,
  transaction: transactionAPI,
};
