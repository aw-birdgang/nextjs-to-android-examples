"use client";

import { useAdContext } from '../../../../presentation/providers/AdProvider';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SnsAdDetailClient() {
  const { ads } = useAdContext();
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const ad = ads.find(ad => ad.id === id && ad.type === 'sns');
  const [shared, setShared] = useState(false);
  const [rewardStatus, setRewardStatus] = useState<null | 'success' | 'duplicate' | 'error'>(null);
  const [rewardAmount, setRewardAmount] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 더미: 광고별 공유/후기 완료 여부를 localStorage로 관리(중복 체크)
  useEffect(() => {
    if (!ad) return;
    const done = localStorage.getItem(`sns_shared_${ad.id}`);
    if (done) setShared(true);
  }, [ad]);

  if (!ad) return <div>광고를 찾을 수 없습니다.</div>;

  // SNS 공유/후기 버튼 클릭
  const handleShare = () => {
    // 실제로는 window.open으로 SNS 공유/후기 창을 띄우지만, 여기선 더미로 처리
    window.open('https://www.instagram.com/', '_blank', 'width=600,height=600');
    // 공유/후기 완료 버튼 활성화
    setShared(true);
  };

  // 공유/후기 완료 후 리워드 지급 시도
  const handleRewardClaim = () => {
    // 더미: localStorage로 중복 체크
    if (localStorage.getItem(`sns_rewarded_${ad.id}`)) {
      setRewardStatus('duplicate');
      setErrorMessage(null);
      return;
    }
    // 더미: 리워드 지급 성공
    setRewardStatus('success');
    setRewardAmount(250); // 예시
    setErrorMessage(null);
    localStorage.setItem(`sns_rewarded_${ad.id}`, '1');
  };

  const handleRetry = () => {
    setRewardStatus(null);
    setErrorMessage(null);
    handleRewardClaim();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 p-6">
      <div className="max-w-lg mx-auto bg-white rounded-2xl p-8 shadow-2xl border-2 border-gray-100">
        <button onClick={() => router.back()} className="mb-4 text-blue-600 font-bold">&larr; 목록으로</button>
        <img src={ad.image} alt={ad.title} className="w-full h-48 object-contain mb-6" />
        <h1 className="text-2xl font-black mb-2">{ad.title}</h1>
        <p className="text-gray-700 mb-4">{ad.description}</p>
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-4 mb-4 shadow">
          <span className="text-white font-black text-lg">💰 리워드: {ad.reward}</span>
        </div>
        {/* 상태 메시지 */}
        {rewardStatus === 'success' && (
          <div className="mb-4 p-3 bg-green-100 border-2 border-green-300 text-green-800 rounded-xl font-bold text-center">
            🎉 리워드 지급 완료! {rewardAmount}P 지급됨
          </div>
        )}
        {rewardStatus === 'duplicate' && (
          <div className="mb-4 p-3 bg-yellow-100 border-2 border-yellow-300 text-yellow-800 rounded-xl font-bold text-center">
            ✅ 이미 리워드가 지급된 광고입니다!
          </div>
        )}
        {rewardStatus === 'error' && errorMessage && (
          <div className="mb-4 p-3 bg-red-100 border-2 border-red-300 text-red-800 rounded-xl font-bold text-center">
            ❌ {errorMessage}
          </div>
        )}
        {/* 공유/후기 버튼 및 완료 버튼 */}
        {!shared && (
          <button
            onClick={handleShare}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-2xl font-black text-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:scale-105 shadow-2xl border-2 border-blue-500 mb-2"
          >
            📸 SNS 공유/후기 작성
          </button>
        )}
        {shared && rewardStatus === null && (
          <button
            onClick={handleRewardClaim}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-8 rounded-2xl font-black text-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:scale-105 shadow-2xl border-2 border-green-500"
          >
            🎁 공유/후기 완료! 리워드 받기
          </button>
        )}
        {rewardStatus === 'error' && (
          <button
            onClick={handleRetry}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-8 rounded-2xl font-black text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:scale-105 shadow-xl border-2 border-orange-400 mt-2"
          >
            🔄 다시 시도
          </button>
        )}
      </div>
    </div>
  );
}
