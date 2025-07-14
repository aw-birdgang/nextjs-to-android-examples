// src/types/ad.ts
export type AdTypeKey =
  | 'expose'
  | 'sns'
  | 'ua'
  | 'app_inflow'
  | 'action'
  | 'live'
  | 'retargeting'
  | 'ranking';

export interface AdTypeMeta {
  key: AdTypeKey;
  name: string;
  description: string;
  example: string;
  image: string;
  route: string;
}

export interface Ad {
  id: string;
  type: AdTypeKey;
  title: string;
  description: string;
  reward: string;
  image: string;
  example: string;
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
