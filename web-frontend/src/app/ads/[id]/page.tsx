// src/app/ads/[id]/page.tsx
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default function AdDetailPage({ params }: Props) {
  const { id } = params;

  // 실제 광고 데이터 fetch 또는 mock 데이터 사용
  // const ad = fetchAdById(id);
  // if (!ad) return notFound();

  return (
    <div>
      <h1>광고 상세 페이지</h1>
      <p>광고 ID: {id}</p>
      {/* 광고 상세 내용 렌더링 */}
    </div>
  );
}
