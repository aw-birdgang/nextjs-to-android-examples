import RewardButton from './RewardButton';

export default function AdPage({ adType }: { adType: string }) {
  switch (adType) {
    case 'expose':
      return <RewardButton label="방문 리워드 받기" onReward={() => {/* ... */}} />;
    case 'sns':
      return <RewardButton label="SNS 인증샷 올리기" onReward={() => {/* ... */}} />;
    // ... 기타 유형
    default:
      return <div>알 수 없는 광고 유형</div>;
  }
}
