// web-frontend/src/app/ads/action/ActionButton.tsx (추가)
import { useState } from 'react';

type Props = {
  onActionComplete: () => void;
};

export default function ActionButton({ onActionComplete }: Props) {
  const [loading, setLoading] = useState(false);

  // 외부 서비스 연결 및 액션 완료(더미)
  const handleClick = async () => {
    setLoading(true);
    // 실제로는 외부 서비스로 이동/연결 후, 완료 시 콜백
    setTimeout(() => {
      setLoading(false);
      onActionComplete();
    }, 1200); // 더미 대기
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      style={{
        padding: '12px 24px',
        fontSize: 18,
        borderRadius: 8,
        background: '#0070f3',
        color: '#fff',
        border: 'none',
        cursor: loading ? 'not-allowed' : 'pointer',
        marginTop: 24,
      }}
    >
      {loading ? '처리 중...' : '상담/가입/전화하기'}
    </button>
  );
}
