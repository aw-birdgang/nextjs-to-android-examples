// web-frontend/src/app/ads/action/RewardModal.tsx (추가)
type Props = {
  open: boolean;
  status: 'success' | 'duplicate' | 'fail' | null;
  onClose: () => void;
};

export default function RewardModal({ open, status, onClose }: Props) {
  if (!open || !status) return null;

  let title = '';
  let desc = '';
  if (status === 'success') {
    title = '리워드 지급 완료!';
    desc = '축하합니다. 신규 액션이 확인되어 리워드가 지급되었습니다.';
  } else if (status === 'duplicate') {
    title = '이미 리워드 지급됨';
    desc = '이미 해당 광고에 대해 리워드가 지급된 이력이 있습니다.';
  } else {
    title = '처리 실패';
    desc = '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.';
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{
        background: '#fff', padding: 32, borderRadius: 12, minWidth: 320, textAlign: 'center'
      }}>
        <h3>{title}</h3>
        <p>{desc}</p>
        <button onClick={onClose} style={{
          marginTop: 16, padding: '8px 20px', borderRadius: 6, border: 'none', background: '#0070f3', color: '#fff'
        }}>닫기</button>
      </div>
    </div>
  );
}