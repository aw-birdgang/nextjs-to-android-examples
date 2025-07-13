// src/types/ad.ts
export type AdType =
  | "expose"
  | "sns"
  | "ua"
  | "app_inflow"
  | "action"
  | "live"
  | "retargeting"
  | "ranking";

export interface Ad {
  id: string;
  type: AdType;
  title: string;
  description: string;
  reward: string;
  image: string;
}

export interface RewardClaim {
  adId: string;
  userId: string;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
}

export interface AdViewListener {
  onAdLoaded(): void;
  onAdError(error: string): void;
  onRewardClaimed(reward: string): void;
}
