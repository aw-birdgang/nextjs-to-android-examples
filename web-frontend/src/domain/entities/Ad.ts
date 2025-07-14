export interface Ad {
  id: string;
  type: AdType;
  title: string;
  description: string;
  reward: string;
  image: string;
  example: string;
  requirements?: string[];
  duration?: number; // seconds
  maxRewards?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type AdType = 
  | "expose" 
  | "sns" 
  | "ua" 
  | "app_inflow" 
  | "action" 
  | "live" 
  | "retargeting" 
  | "ranking";

export interface User {
  id: string;
  email: string;
  name: string;
  totalRewards: number;
  completedAds: string[];
  createdAt: Date;
}

export interface Reward {
  id: string;
  adId: string;
  userId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  claimedAt?: Date;
  createdAt: Date;
}