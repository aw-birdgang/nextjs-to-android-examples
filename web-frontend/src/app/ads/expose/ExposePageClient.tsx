"use client";

import { useAdContext } from '../../../presentation/providers/AdProvider';
import AdCard from '../../../components/AdCard';

export default function ExposePageClient() {
  const { ads, loading, error } = useAdContext();

  // 노출형 광고만 필터링
  const exposeAds = ads.filter(ad => ad.type === 'expose');

  if (loading) {
    return (
      <div style={{ padding: 24 }}>
        <h1>노출형 광고</h1>
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 24 }}>
        <h1>노출형 광고</h1>
        <p>오류: {error}</p>
      </div>
    );
  }

  if (exposeAds.length === 0) {
    return (
      <div style={{ padding: 24 }}>
        <h1>노출형 광고</h1>
        <p>현재 노출형(expose) 타입의 광고가 없습니다.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>노출형 광고 리스트</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {exposeAds.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>
    </div>
  );
}
