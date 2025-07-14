"use client";

import { useState } from 'react';
import { Reward } from '../../domain/entities/Ad';
import { ClaimRewardUseCase } from '../../domain/usecases/ClaimRewardUseCase';
import { RewardRepositoryImpl } from '../../data/repositories/RewardRepositoryImpl';
import { UserRepositoryImpl } from '../../data/repositories/UserRepositoryImpl';

export const useReward = () => {
  const [claiming, setClaiming] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setError(err instanceof Error ? err.message : '리워드 지급에 실패했습니다.');
      return null;
    } finally {
      setClaiming(false);
    }
  };

  return { claimReward, claiming, error };
};
