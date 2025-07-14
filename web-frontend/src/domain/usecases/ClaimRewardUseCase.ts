import { Reward } from '../entities/Ad';
import { IRewardRepository } from '../repositories/IRewardRepository';
import { IUserRepository } from '../repositories/IUserRepository';

export class ClaimRewardUseCase {
  constructor(
    private rewardRepository: IRewardRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(adId: string): Promise<Reward> {
    try {
      const user = await this.userRepository.getCurrentUser();
      if (!user) {
        throw new Error('사용자 정보를 찾을 수 없습니다.');
      }

      const hasCompleted = await this.userRepository.hasCompletedAd(user.id, adId);
      if (hasCompleted) {
        throw new Error('이미 완료한 광고입니다.');
      }

      const reward = await this.rewardRepository.claimReward(adId, user.id);
      
      // Update user rewards
      await this.userRepository.updateUser({
        totalRewards: user.totalRewards + reward.amount,
        completedAds: [...user.completedAds, adId]
      });

      return reward;
    } catch (error) {
      console.error('Failed to claim reward:', error);
      throw error;
    }
  }
}
