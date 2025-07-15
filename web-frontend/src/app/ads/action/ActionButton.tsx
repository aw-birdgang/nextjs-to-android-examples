import { useState } from 'react';

type Props = {
  onActionComplete: () => void;
};

export default function ActionButton({ onActionComplete }: Props) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onActionComplete();
    }, 1200);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`
        w-full py-5 px-8 rounded-2xl font-black text-xl transition-all duration-300 shadow-2xl border-2
        ${loading 
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300' 
          : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 hover:scale-105 active:scale-95 border-green-500'
        }
      `}
    >
      {loading ? '⏳ 처리 중...' : '📞 상담/가입/전화하기'}
    </button>
  );
}
