"use client";

import { useState } from 'react';
import ActionButton from './ActionButton';
import RewardModal from './RewardModal';
import {sendActionComplete} from "@/app/ads/action/dummy-action-api";

export default function ActionAdPageClient() {
  const [modal, setModal] = useState<{ open: boolean; status: 'success' | 'duplicate' | 'fail' | null }>({
    open: false,
    status: null,
  });

  // 외부 서비스 액션 완료 시 호출 (더미)
  const handleActionComplete = async () => {
    // 더미 API 호출 (userId, adId는 하드코딩)
    const result = await sendActionComplete({ userId: 'user1', adId: 'ad123' });
    setModal({ open: true, status: result });
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #eee', borderRadius: 12 }}>
      <h2>상담/가입/전화 유도 광고</h2>
      <p>아래 버튼을 눌러 상담 또는 가입을 진행해보세요!</p>
      <ActionButton onActionComplete={handleActionComplete} />
      <RewardModal
        open={modal.open}
        status={modal.status}
        onClose={() => setModal({ open: false, status: null })}
      />
    </div>
  );
}
