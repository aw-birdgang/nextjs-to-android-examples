// src/app/ads/ua/page.tsx
"use client";
import AdCard from "../../../components/AdCard";
import { Ad } from "../../../types/ad";

const ads: Ad[] = [
  {
    id: "1",
    type: "expose",
    title: "코카콜라 1+1 이벤트",
    description: "이벤트 페이지 방문 시 2원 지급",
    reward: "2원",
    image: "/images/expose.jpg",
  },
  {
    id: "2",
    type: "sns",
    title: "인스타그램 인증샷",
    description: "인스타그램에 인증샷 올리면 250P 지급",
    reward: "250P",
    image: "/images/sns.jpg",
  },
  {
    id: "3",
    type: "ua",
    title: "게임 앱 설치",
    description: "게임 앱 설치 시 300P, 실행 시 추가 100P",
    reward: "최대 400P",
    image: "/images/ua.jpg",
  },
  {
    id: "4",
    type: "app_inflow",
    title: "ETF 앱 추천 페이지 열기",
    description: "ETF 앱 설치 후 추천 페이지 열기 시 리워드",
    reward: "특별 리워드",
    image: "/images/app_inflow.jpg",
  },
  {
    id: "5",
    type: "action",
    title: "보험 가입 상담",
    description: "보험 가입 상담 완료 시 280원 지급",
    reward: "280원",
    image: "/images/action.jpg",
  },
  {
    id: "6",
    type: "live",
    title: "Z5 런칭 쇼핑라이브",
    description: "5분 이상 시청 시 10P 지급",
    reward: "10P",
    image: "/images/live.jpg",
  },
  {
    id: "7",
    type: "retargeting",
    title: "이전 상품 재방문",
    description: "이전에 본 상품 다시 방문 시 2원 지급",
    reward: "2원",
    image: "/images/retargeting.jpg",
  },
  {
    id: "8",
    type: "ranking",
    title: "버즈테이블 장소 저장",
    description: "장소 저장 시 포인트 제공",
    reward: "포인트",
    image: "/images/ranking.jpg",
  },
];

export default function UserAcquisitionPage() {
  console.log("[UserAcquisitionPage] 렌더링됨");
  return (
    <div>
      <h1>UA 광고 리스트</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>
    </div>
  );
}
