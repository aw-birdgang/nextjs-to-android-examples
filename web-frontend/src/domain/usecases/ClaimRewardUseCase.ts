import { Reward } from '../entities/Ad';
import { IRewardRepository } from '../repositories/IRewardRepository';
import { IUserRepository } from '../repositories/IUserRepository';

// 커스텀 에러 클래스 정의
export class AdAlreadyCompletedError extends Error {
  constructor(message: string = '이미 완료한 광고입니다.') {
    super(message);
    this.name = 'AdAlreadyCompletedError';
  }
}

export class UserNotFoundError extends Error {
  constructor(message: string = '사용자 정보를 찾을 수 없습니다.') {
    super(message);
    this.name = 'UserNotFoundError';
  }
}

export class ClaimRewardUseCase {
  constructor(
    private rewardRepository: IRewardRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(adId: string): Promise<Reward> {
    try {
      const user = await this.userRepository.getCurrentUser();
      if (!user) {
        throw new UserNotFoundError();
      }

      const hasCompleted = await this.userRepository.hasCompletedAd(user.id, adId);
      if (hasCompleted) {
        throw new AdAlreadyCompletedError();
      }

      const reward = await this.rewardRepository.claimReward(adId, user.id);
      
      // Update user rewards
      await this.userRepository.updateUser({
        totalRewards: user.totalRewards + reward.amount,
        completedAds: [...user.completedAds, adId]
      });

      return reward;
    } catch (error) {
      // 이미 정의된 에러는 그대로 던지기
      if (error instanceof AdAlreadyCompletedError || error instanceof UserNotFoundError) {
        throw error;
      }
      
      console.error('Failed to claim reward:', error);
      throw new Error('리워드 지급 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  }
}
