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
  const [rewardStatus, setRewardStatus] = useState<null | 'success' | 'duplicate' | 'error'>(null);
  const [rewardAmount, setRewardAmount] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // 노출형 광고라면 진입 시 자동 리워드 지급 시도
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
      setErrorMessage(null);
    } else if (rewardError) {
      if (rewardError.type === 'already_completed') {
        setRewardStatus('duplicate');
        setErrorMessage(null);
      } else {
        setRewardStatus('error');
        setErrorMessage(rewardError.message);
      }
    }
  };

  const handleRetry = () => {
    setRewardStatus(null);
    setErrorMessage(null);
    handleRewardClaim();
  };

  return (
    <AdDetail 
      ad={ad}
      onBack={handleBack}
      onRewardClaim={handleRewardClaim}
      onRetry={handleRetry}
      rewardStatus={rewardStatus}
      rewardAmount={rewardAmount}
      claiming={claiming}
      errorMessage={errorMessage}
    />
  );
}
