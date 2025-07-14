import { Reward } from '../../domain/entities/Ad';
import { IRewardRepository } from '../../domain/repositories/IRewardRepository';
import { LocalStorage } from '../../infrastructure/storage/LocalStorage';

export class RewardRepositoryImpl implements IRewardRepository {
  private readonly REWARDS_KEY = 'rewards';

  async claimReward(adId: string, userId: string): Promise<Reward> {
    const reward: Reward = {
      id: `reward-${Date.now()}`,
      adId,
      userId,
      amount: 100, // Mock amount
      status: 'pending',
      createdAt: new Date()
    };

    // Store reward
    const rewards = LocalStorage.get<Reward[]>(this.REWARDS_KEY) || [];
    rewards.push(reward);
    LocalStorage.set(this.REWARDS_KEY, rewards);

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Update status to completed
    reward.status = 'completed';
    reward.claimedAt = new Date();
    LocalStorage.set(this.REWARDS_KEY, rewards);

    return reward;
  }

  async getUserRewards(userId: string): Promise<Reward[]> {
    const rewards = LocalStorage.get<Reward[]>(this.REWARDS_KEY) || [];
    return rewards.filter(reward => reward.userId === userId);
  }

  async getRewardStatus(rewardId: string): Promise<Reward> {
    const rewards = LocalStorage.get<Reward[]>(this.REWARDS_KEY) || [];
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward) {
      throw new Error('리워드를 찾을 수 없습니다.');
    }
    return reward;
  }
}
