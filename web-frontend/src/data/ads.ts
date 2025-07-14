// src/data/ads.ts
import { Ad } from '../types/ad';

export const ads: Ad[] = [
  {
    id: "1",
    type: "expose",
    title: "코카콜라 1+1 이벤트",
    description: "코카콜라 1+1 이벤트 페이지 방문",
    reward: "2원",
    image: "/images/ad-type-expose.png",
    example: "코카콜라 1+1 이벤트 페이지 방문 시 2원 지급",
  },
  {
    id: "2",
    type: "sns",
    title: "인스타그램 인증샷",
    description: "인스타그램에 인증샷 올리기",
    reward: "250P",
    image: "/images/ad-type-sns.png",
    example: "인스타그램에 인증샷 올리면 250P 지급",
  },
  {
    id: "3",
    type: "ua",
    title: "게임 앱 설치",
    description: "앱 설치 중심의 광고 (User Acquisition)",
    reward: "최대 400P",
    image: "/images/ad-type-ua.png", // (수정)
    example: "게임 앱 설치 시 300P, 실행 시 추가 100P",
  },
  {
    id: "4",
    type: "app_inflow",
    title: "ETF 앱 추천 페이지 열기",
    description: "설치된 앱의 특정 기능이나 페이지 실행 유도",
    reward: "특별 리워드",
    image: "/images/ad-type-app-inflow.png", // (수정)
    example: "ETF 앱 설치 후 추천 페이지 열기 시 리워드",
  },
  {
    id: "5",
    type: "action",
    title: "보험 가입 상담",
    description: "보험 가입, 전화 연결 등 고난이도 액션 유도",
    reward: "280원",
    image: "/images/ad-type-action.png", // (수정)
    example: "보험 가입 상담 완료 시 280원 지급",
  },
  {
    id: "6",
    type: "live",
    title: "Z5 런칭 쇼핑라이브",
    description: "라이브 방송 시청을 통한 상품 홍보",
    reward: "10P",
    image: "/images/ad-type-live.png", // (수정)
    example: "Z5 런칭 쇼핑라이브 5분 이상 시청 시 10P",
  },
  {
    id: "7",
    type: "retargeting",
    title: "이전 상품 재방문",
    description: "이탈 유저 대상 재유입 광고",
    reward: "2원",
    image: "/images/ad-type-retargeting.png", // (수정)
    example: "이전에 본 상품 다시 방문 시 2원 지급",
  },
  {
    id: "8",
    type: "ranking",
    title: "버즈테이블 장소 저장",
    description: "앱 내 검색, 장소 저장 등으로 랭킹 향상",
    reward: "포인트",
    image: "/images/ad-type-ranking.png", // (수정)
    example: "‘버즈테이블’ 장소 저장 시 포인트 제공",
  },
];
