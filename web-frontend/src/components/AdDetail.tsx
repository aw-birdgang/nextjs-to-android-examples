"use client";

import Image from 'next/image';
import { Ad } from '../domain/entities/Ad';

interface AdDetailProps {
  ad: Ad;
  onBack: () => void;
  onRewardClaim: () => void;
  rewardStatus?: 'success' | 'duplicate' | null; // (추가)
  rewardAmount?: number | null;                  // (추가)
  claiming?: boolean;                            // (추가)
}

export default function AdDetail({ ad, onBack, onRewardClaim, rewardStatus, rewardAmount, claiming }: AdDetailProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 p-6">
      <div className="max-w-lg mx-auto">
        {/* 헤더 */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="p-4 rounded-2xl bg-white shadow-xl mr-4 hover:shadow-2xl transition-shadow border-2 border-gray-100"
          >
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-black text-gray-900">광고 상세</h1>
        </div>

        {/* 광고 이미지 */}
        <div className="relative w-full h-56 bg-white rounded-2xl overflow-hidden mb-8 shadow-2xl border-4 border-white">
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
        <div className="bg-white rounded-2xl p-8 shadow-2xl border-2 border-gray-100">
          <h2 className="text-3xl font-black text-gray-900 mb-4 leading-tight">
            {ad.title}
          </h2>
          <p className="text-gray-700 mb-8 leading-relaxed font-medium text-lg">
            {ad.description}
          </p>
          
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 mb-8 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-white font-black text-lg">💰 리워드</span>
              <span className="text-3xl font-black text-white">
                {ad.reward}
              </span>
            </div>
          </div>

          {/* 참여 버튼 및 안내 메시지 */}
          <div>
            {rewardStatus === 'success' && (
              <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-xl font-bold text-center">
                🎉 리워드 지급 완료! {rewardAmount}원 지급됨
              </div>
            )}
            {rewardStatus === 'duplicate' && (
              <div className="mb-4 p-4 bg-yellow-100 text-yellow-800 rounded-xl font-bold text-center">
                ⚠️ 이미 리워드가 지급된 광고입니다.
              </div>
            )}
            <button
              onClick={onRewardClaim}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-5 px-8 rounded-2xl font-black text-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:scale-105 shadow-2xl border-2 border-blue-500"
              disabled={rewardStatus === 'success' || rewardStatus === 'duplicate' || claiming}
            >
              {claiming ? "처리 중..." : "🎁 리워드 받기"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
