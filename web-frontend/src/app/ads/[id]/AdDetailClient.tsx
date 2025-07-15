"use client";

import AdDetail from '../../../components/AdDetail';
import { useAdContext } from '../../../presentation/providers/AdProvider';
import { Ad } from '../../../domain/entities/Ad';
import { useEffect, useState } from 'react';

interface AdDetailClientProps {
  ad: Ad;
}

export default function AdDetailClient({ ad }: AdDetailClientProps) {
  const { claimReward, claiming, rewardError } = useAdContext();
  const [rewardStatus, setRewardStatus] = useState<null | 'success' | 'duplicate'>(null);
  const [rewardAmount, setRewardAmount] = useState<number | null>(null);

  useEffect(() => {
    // (추가) 노출형 광고라면 진입 시 자동 리워드 지급 시도
    if (ad.type === 'expose') {
      handleRewardClaim();
    }
    // eslint-disable-next-line
  }, [ad.id]);

  const handleBack = () => {
    window.history.back();
  };

  const handleRewardClaim = async () => {
    const result = await claimReward(ad.id);
    if (result) {
      setRewardStatus('success');
      setRewardAmount(result.amount);
    } else if (rewardError?.includes('이미 완료')) {
      setRewardStatus('duplicate');
    }
  };

  return (
    <AdDetail 
      ad={ad}
      onBack={handleBack}
      onRewardClaim={handleRewardClaim}
      rewardStatus={rewardStatus} // (추가)
      rewardAmount={rewardAmount} // (추가)
      claiming={claiming}         // (추가)
    />
  );
}
