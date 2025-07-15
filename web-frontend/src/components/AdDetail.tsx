"use client";

import Image from 'next/image';
import { Ad } from '../domain/entities/Ad';

interface AdDetailProps {
  ad: Ad;
  onBack: () => void;
  onRewardClaim: () => void;
  onRetry?: () => void;
  rewardStatus?: 'success' | 'duplicate' | 'error' | null;
  rewardAmount?: number | null;
  claiming?: boolean;
  errorMessage?: string | null;
}

export default function AdDetail({ 
  ad, 
  onBack, 
  onRewardClaim, 
  onRetry,
  rewardStatus, 
  rewardAmount, 
  claiming,
  errorMessage 
}: AdDetailProps) {
  const isCompleted = rewardStatus === 'success' || rewardStatus === 'duplicate';
  const isError = rewardStatus === 'error';

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

          {/* 상태 메시지 */}
          {rewardStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-100 border-2 border-green-300 text-green-800 rounded-xl font-bold text-center">
              🎉 리워드 지급 완료! {rewardAmount}원 지급됨
            </div>
          )}
          
          {rewardStatus === 'duplicate' && (
            <div className="mb-6 p-4 bg-yellow-100 border-2 border-yellow-300 text-yellow-800 rounded-xl font-bold text-center">
              ✅ 이미 완료한 광고입니다! 다른 광고도 확인해보세요 🎯
            </div>
          )}
          
          {isError && errorMessage && (
            <div className="mb-6 p-4 bg-red-100 border-2 border-red-300 text-red-800 rounded-xl font-bold text-center">
              ❌ {errorMessage}
            </div>
          )}

          {/* 액션 버튼 */}
          <div className="space-y-3">
            {!isCompleted && !isError && (
              <button
                onClick={onRewardClaim}
                disabled={claiming}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-5 px-8 rounded-2xl font-black text-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:scale-105 shadow-2xl border-2 border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {claiming ? "처리 중..." : "🎁 리워드 받기"}
              </button>
            )}
            
            {isError && onRetry && (
              <button
                onClick={onRetry}
                disabled={claiming}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-8 rounded-2xl font-black text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:scale-105 shadow-xl border-2 border-orange-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {claiming ? "재시도 중..." : "🔄 다시 시도"}
              </button>
            )}
            
            {isCompleted && (
              <button
                onClick={onBack}
                className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white py-4 px-8 rounded-2xl font-black text-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 hover:scale-105 shadow-xl border-2 border-gray-400"
              >
                📋 다른 광고 보기
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
