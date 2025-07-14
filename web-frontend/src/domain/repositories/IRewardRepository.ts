import { Reward } from '../entities/Ad';

export interface IRewardRepository {
  claimReward(adId: string, userId: string): Promise<Reward>;
  getUserRewards(userId: string): Promise<Reward[]>;
  getRewardStatus(rewardId: string): Promise<Reward>;
}