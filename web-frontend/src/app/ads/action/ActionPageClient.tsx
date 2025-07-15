"use client";

import {useState} from 'react';
import ActionButton from './ActionButton';
import RewardModal from './RewardModal';
import {sendActionComplete} from './dummy-action-api';

export default function ActionAdPageClient() {
  const [modal, setModal] = useState<{ open: boolean; status: 'success' | 'duplicate' | 'fail' | null }>({
    open: false,
    status: null,
  });

  const handleActionComplete = async () => {
    const result = await sendActionComplete({ userId: 'user1', adId: 'ad123' });
    setModal({ open: true, status: result });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 p-6">
      <div className="max-w-lg mx-auto my-10 p-8 bg-white rounded-2xl shadow-2xl border-2 border-gray-100">
        <h2 className="text-3xl font-black text-gray-900 mb-6 text-center">상담/가입/전화 유도 광고</h2>
        <p className="text-gray-700 text-center mb-8 font-medium text-lg leading-relaxed">아래 버튼을 눌러 상담 또는 가입을 진행해보세요!</p>
        <ActionButton onActionComplete={handleActionComplete} />
        <RewardModal
          open={modal.open}
          status={modal.status}
          onClose={() => setModal({ open: false, status: null })}
        />
      </div>
    </div>
  );
}
