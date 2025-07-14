"use client";

import { useAdContext } from '../../../presentation/providers/AdProvider';
import AdCard from '../../../components/AdCard';

export default function RankingPageClient() {
  const { ads, loading, error } = useAdContext();

  // 랭킹 부스팅형 광고만 필터링
  const rankingAds = ads.filter(ad => ad.type === 'ranking');

  if (loading) {
    return (
      <div style={{ padding: 24 }}>
        <h1>랭킹 부스팅형 광고</h1>
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 24 }}>
        <h1>랭킹 부스팅형 광고</h1>
        <p>오류: {error}</p>
      </div>
    );
  }

  if (rankingAds.length === 0) {
    return (
      <div style={{ padding: 24 }}>
        <h1>랭킹 부스팅형 광고</h1>
        <p>현재 랭킹 부스팅형(ranking) 타입의 광고가 없습니다.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>랭킹 부스팅형 광고 리스트</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {rankingAds.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>
    </div>
  );
}
