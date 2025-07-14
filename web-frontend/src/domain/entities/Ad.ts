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
  | "expose"        // 노출형
  | "sns"           // SNS형
  | "ua"            // UA 특화형
  | "app_inflow"    // 앱 유입형
  | "action"        // 액션 유도형
  | "live"          // 라이브커머스형
  | "retargeting"   // 리타겟팅형
  | "ranking";      // 랭킹 부스팅형

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