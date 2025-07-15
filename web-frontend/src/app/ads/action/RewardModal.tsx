type Props = {
  open: boolean;
  status: 'success' | 'duplicate' | 'fail' | null;
  onClose: () => void;
};

export default function RewardModal({ open, status, onClose }: Props) {
  if (!open || !status) return null;

  let title = '';
  let desc = '';
  let bgColor = '';
  let textColor = '';
  let icon = '';
  
  if (status === 'success') {
    title = '🎉 리워드 지급 완료!';
    desc = '축하합니다. 신규 액션이 확인되어 리워드가 지급되었습니다.';
    bgColor = 'bg-gradient-to-r from-green-500 to-emerald-600';
    textColor = 'text-white';
    icon = '💰';
  } else if (status === 'duplicate') {
    title = '⚠️ 이미 리워드 지급됨';
    desc = '이미 해당 광고에 대해 리워드가 지급된 이력이 있습니다.';
    bgColor = 'bg-gradient-to-r from-orange-500 to-red-500';
    textColor = 'text-white';
    icon = '🔄';
  } else {
    title = '❌ 처리 실패';
    desc = '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.';
    bgColor = 'bg-gradient-to-r from-red-500 to-pink-500';
    textColor = 'text-white';
    icon = '';
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl border-4 border-white`}>
        <div className={`${bgColor} rounded-xl p-6 mb-6`}>
          <div className="text-4xl mb-4">{icon}</div>
          <h3 className={`text-2xl font-black mb-2 ${textColor}`}>{title}</h3>
        </div>
        <p className="text-gray-700 mb-8 leading-relaxed font-medium text-lg">{desc}</p>
        <button 
          onClick={onClose} 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-black text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:scale-105 shadow-xl border-2 border-blue-500"
        >
          확인
        </button>
      </div>
    </div>
  );
}
