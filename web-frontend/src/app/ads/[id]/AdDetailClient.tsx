"use client";

import AdDetail from '../../../components/AdDetail';
import { useAdContext } from '../../../presentation/providers/AdProvider';
import { Ad } from '../../../domain/entities/Ad';

interface AdDetailClientProps {
  ad: Ad;
}

export default function AdDetailClient({ ad }: AdDetailClientProps) {
  const { claimReward } = useAdContext(); // claiming 제거

  const handleBack = () => {
    window.history.back();
  };

  const handleRewardClaim = async () => {
    const result = await claimReward(ad.id);
    if (result) {
      alert(`리워드가 지급되었습니다: ${result.amount}원`);
    }
  };

  return (
    <AdDetail 
      ad={ad}
      onBack={handleBack}
      onRewardClaim={handleRewardClaim}
    />
  );
}
