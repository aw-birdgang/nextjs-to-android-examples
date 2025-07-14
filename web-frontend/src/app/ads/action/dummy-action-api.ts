// web-frontend/src/app/ads/action/dummyActionApi.ts (추가)

// 더미 DB (메모리)
const actionHistory: { [key: string]: boolean } = {};

// 외부 서비스 → 서버 → DB → 리워드 지급/중복 체크 더미
export async function sendActionComplete({
  userId,
  adId,
}: {
  userId: string;
  adId: string;
}): Promise<'success' | 'duplicate' | 'fail'> {
  // 1초 대기 (네트워크 시뮬레이션)
  await new Promise((res) => setTimeout(res, 1000));
  const key = `${userId}_${adId}`;
  if (actionHistory[key]) {
    return 'duplicate';
  }
  // 신규 지급
  actionHistory[key] = true;
  return 'success';
}
