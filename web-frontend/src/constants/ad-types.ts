// src/constants/ad-types.ts
import { AdTypeMeta } from '../types/ad';

export const AD_TYPES: AdTypeMeta[] = [
  {
    key: 'expose',
    name: '노출형 광고',
    description: '단순 페이지 방문으로 리워드를 주는 광고',
    example: '코카콜라 1+1 이벤트 페이지 방문 시 2원 지급',
    image: '/images/ad-type-expose.png',
    route: '/ads/expose', // /ads/expose에서 /ads/1로 변경
  },
  {
    key: 'sns',
    name: 'SNS형 광고',
    description: 'SNS 공유나 후기 작성 유도',
    example: '인스타그램에 인증샷 올리면 250P 지급',
    image: '/images/ad-type-sns.png',
    route: '/ads/sns', // /ads/sns에서 /ads/2로 변경
  },
  {
    key: 'ua',
    name: 'UA 특화형 광고',
    description: '앱 설치 중심의 광고 (User Acquisition)',
    example: '게임 앱 설치 시 300P, 실행 시 추가 100P',
    image: '/images/ad-type-ua.png',
    route: '/ads/ua', // /ads/ua에서 /ads/3로 변경
  },
  {
    key: 'app_inflow',
    name: '앱 유입형 광고',
    description: '설치된 앱의 특정 기능이나 페이지 실행 유도',
    example: 'ETF 앱 설치 후 추천 페이지 열기 시 리워드',
    image: '/images/ad-type-app-inflow.png',
    route: '/ads/app_inflow', // /ads/app_inflow에서 /ads/4로 변경
  },
  {
    key: 'action',
    name: '액션 유도형 광고',
    description: '보험 가입, 전화 연결 등 고난이도 액션 유도',
    example: '보험 가입 상담 완료 시 280원 지급',
    image: '/images/ad-type-action.png',
    route: '/ads/action', // /ads/action에서 /ads/5로 변경
  },
  {
    key: 'live',
    name: '라이브커머스형 광고',
    description: '라이브 방송 시청을 통한 상품 홍보',
    example: 'Z5 런칭 쇼핑라이브 5분 이상 시청 시 10P',
    image: '/images/ad-type-live.png',
    route: '/ads/live', // /ads/live에서 /ads/6로 변경
  },
  {
    key: 'retargeting',
    name: '리타겟팅형 광고',
    description: '이탈 유저 대상 재유입 광고',
    example: '이전에 본 상품 다시 방문 시 2원 지급',
    image: '/images/ad-type-retargeting.png',
    route: '/ads/retargeting', // /ads/retargeting에서 /ads/7로 변경
  },
  {
    key: 'ranking',
    name: '랭킹 부스팅형 광고',
    description: '앱 내 검색, 장소 저장 등으로 랭킹 향상',
    example: "'버즈테이블' 장소 저장 시 포인트 제공",
    image: '/images/ad-type-ranking.png',
    route: '/ads/ranking', // /ads/ranking에서 /ads/8로 변경
  },
];
