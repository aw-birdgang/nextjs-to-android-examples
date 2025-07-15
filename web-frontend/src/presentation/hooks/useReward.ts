"use client";

import { useState } from 'react';
import { Reward } from '../../domain/entities/Ad';
import { ClaimRewardUseCase, AdAlreadyCompletedError, UserNotFoundError } from '../../domain/usecases/ClaimRewardUseCase';
import { RewardRepositoryImpl } from '../../data/repositories/RewardRepositoryImpl';
import { UserRepositoryImpl } from '../../data/repositories/UserRepositoryImpl';

export type RewardError = {
  type: 'already_completed' | 'user_not_found' | 'network' | 'unknown';
  message: string;
};

export const useReward = () => {
  const [claiming, setClaiming] = useState(false);
  const [error, setError] = useState<RewardError | null>(null);

  const claimReward = async (adId: string): Promise<Reward | null> => {
    try {
      setClaiming(true);
      setError(null);
      
      const claimRewardUseCase = new ClaimRewardUseCase(
        new RewardRepositoryImpl(),
        new UserRepositoryImpl()
      );
      
      const reward = await claimRewardUseCase.execute(adId);
      return reward;
    } catch (err) {
      let rewardError: RewardError;
      
      if (err instanceof AdAlreadyCompletedError) {
        rewardError = {
          type: 'already_completed',
          message: '이미 완료한 광고입니다. 다른 광고를 확인해보세요! 🎯'
        };
      } else if (err instanceof UserNotFoundError) {
        rewardError = {
          type: 'user_not_found',
          message: '사용자 정보를 찾을 수 없습니다. 로그인을 확인해주세요.'
        };
      } else if (err instanceof Error && err.message.includes('네트워크')) {
        rewardError = {
          type: 'network',
          message: '네트워크 연결을 확인하고 다시 시도해주세요.'
        };
      } else {
        rewardError = {
          type: 'unknown',
          message: '리워드 지급 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
        };
      }
      
      setError(rewardError);
      return null;
    } finally {
      setClaiming(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return { claimReward, claiming, error, clearError };
};
