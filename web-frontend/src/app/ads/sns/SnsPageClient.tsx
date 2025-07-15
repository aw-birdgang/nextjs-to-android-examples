"use client";

import { useAdContext } from '../../../presentation/providers/AdProvider';
import { useEffect, useState } from 'react';

type RewardStatus = null | 'success' | 'duplicate' | 'error';

interface SnsAdState {
  shared: boolean;
  rewardStatus: RewardStatus;
  rewardAmount: number | null;
  errorMessage: string | null;
}

export default function SnsPageClient() {
  const { ads, loading, error } = useAdContext();
  const snsAds = ads.filter(ad => ad.type === 'sns');

  // 광고별 상태 관리
  const [adStateMap, setAdStateMap] = useState<Record<string, SnsAdState>>({});

  // 최초 진입 시 localStorage에서 상태 복원
  useEffect(() => {
    const initialState: Record<string, SnsAdState> = {};
    snsAds.forEach(ad => {
      const shared = !!localStorage.getItem(`sns_shared_${ad.id}`);
      let rewardStatus: RewardStatus = null;
      let rewardAmount: number | null = null;
      let errorMessage: string | null = null;
      if (localStorage.getItem(`sns_rewarded_${ad.id}`)) {
        rewardStatus = 'duplicate';
      }
      initialState[ad.id] = { shared, rewardStatus, rewardAmount, errorMessage };
    });
    setAdStateMap(initialState);
  }, [snsAds]);

  // SNS 공유/후기 버튼 클릭
  const handleShare = (adId: string) => {
    window.open('https://www.instagram.com/', '_blank', 'width=600,height=600');
    setAdStateMap(prev => ({
      ...prev,
      [adId]: { ...prev[adId], shared: true }
    }));
    localStorage.setItem(`sns_shared_${adId}`, '1');
  };

  // 공유/후기 완료 후 리워드 지급 시도
  const handleRewardClaim = (adId: string) => {
    if (localStorage.getItem(`sns_rewarded_${adId}`)) {
      setAdStateMap(prev => ({
        ...prev,
        [adId]: { ...prev[adId], rewardStatus: 'duplicate', errorMessage: null }
      }));
      return;
    }
    // 더미: 리워드 지급 성공
    setAdStateMap(prev => ({
      ...prev,
      [adId]: { ...prev[adId], rewardStatus: 'success', rewardAmount: 250, errorMessage: null }
    }));
    localStorage.setItem(`sns_rewarded_${adId}`, '1');
  };

  const handleRetry = (adId: string) => {
    setAdStateMap(prev => ({
      ...prev,
      [adId]: { ...prev[adId], rewardStatus: null, errorMessage: null }
    }));
    handleRewardClaim(adId);
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">SNS 광고 리스트</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {snsAds.map(ad => {
            const state = adStateMap[ad.id] || { shared: false, rewardStatus: null, rewardAmount: null, errorMessage: null };
            const { shared, rewardStatus, rewardAmount, errorMessage } = state;
            const isCompleted = rewardStatus === 'success' || rewardStatus === 'duplicate';
            const isError = rewardStatus === 'error';

            return (
              <div key={ad.id} className="bg-white rounded-xl shadow p-6 flex flex-col">
                <img src={ad.image} alt={ad.title} className="w-full h-40 object-contain mb-4" />
                <h2 className="text-xl font-bold mb-2">{ad.title}</h2>
                <p className="text-gray-600 mb-2">{ad.description}</p>
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-3 mb-4 text-white font-bold flex justify-between">
                  <span>💰 리워드</span>
                  <span>{ad.reward}</span>
                </div>
                {/* 상태 메시지 */}
                {rewardStatus === 'success' && (
                  <div className="mb-2 p-2 bg-green-100 border-2 border-green-300 text-green-800 rounded-xl font-bold text-center">
                    🎉 리워드 지급 완료! {rewardAmount}P 지급됨
                  </div>
                )}
                {rewardStatus === 'duplicate' && (
                  <div className="mb-2 p-2 bg-yellow-100 border-2 border-yellow-300 text-yellow-800 rounded-xl font-bold text-center">
                    ✅ 이미 리워드가 지급된 광고입니다!
                  </div>
                )}
                {isError && errorMessage && (
                  <div className="mb-2 p-2 bg-red-100 border-2 border-red-300 text-red-800 rounded-xl font-bold text-center">
                    ❌ {errorMessage}
                  </div>
                )}
                {/* 공유/후기 버튼 및 완료 버튼 */}
                {!shared && (
                  <button
                    onClick={() => handleShare(ad.id)}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-black text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:scale-105 shadow-xl border-2 border-blue-500 mb-2"
                  >
                    📸 SNS 공유/후기 작성
                  </button>
                )}
                {shared && rewardStatus === null && (
                  <button
                    onClick={() => handleRewardClaim(ad.id)}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-black text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:scale-105 shadow-xl border-2 border-green-500"
                  >
                    🎁 공유/후기 완료! 리워드 받기
                  </button>
                )}
                {isError && (
                  <button
                    onClick={() => handleRetry(ad.id)}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-xl font-black text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:scale-105 shadow-xl border-2 border-orange-400 mt-2"
                  >
                    🔄 다시 시도
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
