"use client";

import { useAdContext } from '../../../presentation/providers/AdProvider';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { Ad } from '../../../domain/entities/Ad';

export default function ExposePageClient() {
  const { ads, loading, error, claimReward, claiming, rewardError } = useAdContext();

  // 노출형 광고만 필터링
  const exposeAds = ads.filter(ad => ad.type === 'expose');

  // 광고별 리워드 상태 관리
  const [rewardStatusMap, setRewardStatusMap] = useState<Record<string, null | 'success' | 'duplicate' | 'error'>>({});
  const [rewardAmountMap, setRewardAmountMap] = useState<Record<string, number | null>>({});
  const [errorMessageMap, setErrorMessageMap] = useState<Record<string, string | null>>({});

  const handleRewardClaim = useCallback(async (ad: Ad) => {
    try {
      const result = await claimReward(ad.id);
      if (result) {
        setRewardStatusMap(prev => ({ ...prev, [ad.id]: 'success' }));
        setRewardAmountMap(prev => ({ ...prev, [ad.id]: result.amount }));
        setErrorMessageMap(prev => ({ ...prev, [ad.id]: null }));
      } else if (rewardError) {
        if (rewardError.type === 'already_completed') {
          setRewardStatusMap(prev => ({ ...prev, [ad.id]: 'duplicate' }));
          setErrorMessageMap(prev => ({ ...prev, [ad.id]: null }));
        } else {
          setRewardStatusMap(prev => ({ ...prev, [ad.id]: 'error' }));
          setErrorMessageMap(prev => ({ ...prev, [ad.id]: rewardError.message }));
        }
      }
    } catch (err) {
      setRewardStatusMap(prev => ({ ...prev, [ad.id]: 'error' }));
      setErrorMessageMap(prev => ({ ...prev, [ad.id]: '알 수 없는 오류가 발생했습니다.' }));
    }
  }, [claimReward, rewardError]);

  const handleRetry = useCallback((ad: Ad) => {
    setRewardStatusMap(prev => ({ ...prev, [ad.id]: null }));
    setErrorMessageMap(prev => ({ ...prev, [ad.id]: null }));
    handleRewardClaim(ad);
  }, [handleRewardClaim]);

  useEffect(() => {
    // 진입 시 자동 리워드 지급 시도
    exposeAds.forEach(ad => {
      if (rewardStatusMap[ad.id] === undefined) {
        handleRewardClaim(ad);
      }
    });
    // eslint-disable-next-line
  }, [exposeAds, handleRewardClaim, rewardStatusMap]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-2xl border-2 border-gray-100">
            <h1 className="text-3xl font-black text-gray-900 mb-4">노출형 광고</h1>
            <p className="text-gray-600 text-lg">로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-2xl border-2 border-gray-100">
            <h1 className="text-3xl font-black text-gray-900 mb-4">노출형 광고</h1>
            <p className="text-red-600 text-lg">오류: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (exposeAds.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-2xl border-2 border-gray-100">
            <h1 className="text-3xl font-black text-gray-900 mb-4">노출형 광고</h1>
            <p className="text-gray-600 text-lg">현재 노출형(expose) 타입의 광고가 없습니다.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 mb-2">노출형 광고 리스트</h1>
          <p className="text-gray-700 text-lg">페이지 방문만으로 리워드를 받을 수 있는 광고입니다</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exposeAds.map((ad) => {
            const rewardStatus = rewardStatusMap[ad.id];
            const rewardAmount = rewardAmountMap[ad.id];
            const errorMessage = errorMessageMap[ad.id];
            const isCompleted = rewardStatus === 'success' || rewardStatus === 'duplicate';
            const isError = rewardStatus === 'error';

            return (
              <div key={ad.id} className="flex flex-col bg-white rounded-2xl shadow-2xl border-2 border-gray-100 overflow-hidden">
                {/* 광고 이미지 */}
                <div className="relative w-full h-56 bg-white rounded-t-2xl overflow-hidden shadow border-b-2 border-gray-100">
                  <Image
                    src={ad.image}
                    alt={ad.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/default-ad.jpg';
                    }}
                  />
                </div>
                {/* 광고 정보 */}
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="text-2xl font-black text-gray-900 mb-2">{ad.title}</h2>
                  <p className="text-gray-700 mb-4 leading-relaxed font-medium">{ad.description}</p>
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-4 mb-4 shadow">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-black text-lg">💰 리워드</span>
                      <span className="text-2xl font-black text-white">{ad.reward}</span>
                    </div>
                  </div>
                  {/* 상태 메시지 */}
                  {rewardStatus === 'success' && (
                    <div className="mb-4 p-3 bg-green-100 border-2 border-green-300 text-green-800 rounded-xl font-bold text-center">
                      🎉 리워드 지급 완료! {rewardAmount}원 지급됨
                    </div>
                  )}
                  {rewardStatus === 'duplicate' && (
                    <div className="mb-4 p-3 bg-yellow-100 border-2 border-yellow-300 text-yellow-800 rounded-xl font-bold text-center">
                      ✅ 이미 완료한 광고입니다! 다른 광고도 확인해보세요 🎯
                    </div>
                  )}
                  {isError && errorMessage && (
                    <div className="mb-4 p-3 bg-red-100 border-2 border-red-300 text-red-800 rounded-xl font-bold text-center">
                      ❌ {errorMessage}
                    </div>
                  )}
                  {/* 액션 버튼 */}
                  <div className="space-y-2 mt-auto">
                    {!isCompleted && !isError && (
                      <button
                        onClick={() => handleRewardClaim(ad)}
                        disabled={claiming}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-2xl font-black text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:scale-105 shadow-xl border-2 border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {claiming ? "처리 중..." : "🎁 리워드 받기"}
                      </button>
                    )}
                    {isError && (
                      <button
                        onClick={() => handleRetry(ad)}
                        disabled={claiming}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-2xl font-black text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:scale-105 shadow-xl border-2 border-orange-400 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {claiming ? "재시도 중..." : "🔄 다시 시도"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* 하단 안내 */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-2xl border-2 border-gray-100">
          <div className="text-center">
            <h3 className="text-xl font-black text-gray-900 mb-2">💡 노출형 광고란?</h3>
            <p className="text-gray-700 leading-relaxed">
              단순히 광고 페이지를 방문하는 것만으로도 리워드를 받을 수 있는 광고입니다. 
              별도의 액션이나 설치 없이 바로 리워드를 지급받으실 수 있어요!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
