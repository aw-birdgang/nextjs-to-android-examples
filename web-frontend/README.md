# 광고 타입별 기술 구현 가이드

이 문서는 8가지 광고 타입(노출형, SNS형, UA 특화형, 앱 유입형, 액션 유도형, 라이브커머스형, 리타겟팅형, 랭킹 부스팅형)의 실제 서비스 적용을 위한 기술적 구현 방법을 안내합니다.

---

## 1. 노출형 (단순 방문 리워드)
- **설명:** 광고 페이지 방문만으로 리워드 지급
- **구현:**  
  - 페이지 진입 시 사용자 식별자와 함께 서버에 방문 기록 전송  
  - 서버에서 중복 방문 체크 및 리워드 지급  
- **예시 (React):**
  ```tsx
  useEffect(() => {
    fetch("/api/ad/visit", { method: "POST", body: JSON.stringify({ adId, userId }) });
  }, []);
  ```

---

## 2. SNS형 (SNS 공유/후기)
- **설명:** SNS 인증샷 업로드, 후기 작성 등 외부 공유 유도
- **구현:**  
  - SNS 공유 버튼 연동, 공유 후 서버에 내역 전송  
  - 인증샷 업로드는 파일 업로드 및 서버 검증 필요  
- **예시:**
  ```tsx
  const shareToSNS = () => {
    window.open(`https://www.instagram.com/share?url=${encodeURIComponent(adUrl)}`);
    fetch("/api/ad/sns-share", { method: "POST", body: JSON.stringify({ adId, userId }) });
  };
  ```

---

## 3. UA 특화형 (앱 설치/실행)
- **설명:** 앱 설치 및 실행 시 리워드 지급
- **구현:**  
  - 앱스토어 딥링크 제공  
  - 앱 설치/실행 시 앱에서 서버로 정보 전송  
- **플로우:**  
  1. 광고 페이지 → 앱스토어 이동  
  2. 앱 설치 및 실행  
  3. 앱에서 서버로 설치/실행 완료 API 호출

---

## 4. 앱 유입형 (앱 내 특정 기능/페이지 실행)
- **설명:** 설치된 앱의 특정 기능/페이지 실행 유도
- **구현:**  
  - 딥링크로 앱 내 기능 실행  
  - 앱에서 서버로 액션 정보 전송  
- **예시:**  
  광고 페이지 → `myapp://feature/recommend` → 앱 실행 → 서버 기록

---

## 5. 액션 유도형 (고난이도 액션)
- **설명:** 보험 가입, 전화 연결 등 복잡한 액션 유도
- **구현:**  
  - 외부 서비스와 연동, 액션 완료 시 서버로 결과 전송  
- **예시:**  
  광고 페이지에서 전화 연결 → 상담 완료 시 서버 기록

---

## 6. 라이브커머스형 (라이브 방송 시청)
- **설명:** 라이브 방송 시청을 통한 리워드 지급
- **구현:**  
  - 방송 플레이어 임베드, 시청 시간 추적  
  - 일정 시간 이상 시청 시 서버에 기록  
- **예시:**
  ```tsx
  useEffect(() => {
    const timer = setTimeout(() => {
      fetch("/api/ad/live-reward", { method: "POST", body: JSON.stringify({ adId, userId }) });
    }, 5 * 60 * 1000);
    return () => clearTimeout(timer);
  }, []);
  ```

---

## 7. 리타겟팅형 (재방문 유도)
- **설명:** 이탈 유저의 재방문 시 리워드 지급
- **구현:**  
  - 서버에서 이전 방문 기록 관리  
  - 재방문 시 서버에서 검증 및 리워드 지급  
- **예시:**  
  광고 페이지 진입 시 서버에 재방문 여부 확인 API 호출

---

## 8. 랭킹 부스팅형 (앱 내 액션 유도)
- **설명:** 앱 내 검색, 장소 저장 등으로 랭킹 향상 유도
- **구현:**  
  - 앱 내 특정 액션 발생 시 서버에 기록  
  - 서버에서 검증 후 리워드 지급  
- **예시:**  
  앱에서 장소 저장 시 서버에 API 호출 → 리워드 지급

---

## 공통 구현 팁

- **사용자 식별:** 로그인, 쿠키, 토큰 등으로 고유 식별
- **리워드 지급:** 서버에서 중복/부정 방지 로직 필수
- **프론트엔드:** 각 액션 발생 시 서버와 통신(REST API, WebSocket 등)
- **백엔드:** 각 광고 타입별 액션 검증 및 리워드 지급 로직 구현
- **보안:** 리워드 부정 수급 방지(인증, 로그, IP, 디바이스 체크 등)

---

## 참고

- SNS 공유: 각 SNS의 공식 JS SDK, 공유 API 활용
- 앱 딥링크: [Android 딥링크](https://developer.android.com/training/app-links), [iOS Universal Link](https://developer.apple.com/documentation/xcode/supporting-universal-links-in-your-app)
- 라이브커머스: YouTube, Twitch, 자체 스트리밍 등 임베드 방법 참고

---

### 3. 전체 계층 구조

```
<code_block_to_apply_changes_from>
📦 nextjs-to-android-examples/
├── 📁 web-frontend/                    # Next.js Web Frontend
│   ├── 📁 src/
│   │   ├── 📁 app/                     # App Router
│   │   │   ├── 📁 ads/                 # Ad pages
│   │   │   ├── 📁 pages/               # Other pages
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── 📁 components/              # UI Components
│   │   │   ├── AdCard.tsx
│   │   │   ├── AdDetail.tsx
│   │   │   ├── AdPage.tsx
│   │   │   └── RewardButton.tsx
│   │   ├── 📁 domain/                  # Domain Layer
│   │   │   ├── 📁 entities/
│   │   │   │   └── Ad.ts
│   │   │   ├── 📁 repositories/
│   │   │   │   ├── IAdRepository.ts
│   │   │   │   ├── IUserRepository.ts
│   │   │   │   └── IRewardRepository.ts
│   │   │   └── 📁 usecases/
│   │   │       ├── GetAdsUseCase.ts
│   │   │       └── ClaimRewardUseCase.ts
│   │   ├── 📁 data/                    # Data Layer
│   │   │   ├── 📁 repositories/
│   │   │   │   ├── AdRepositoryImpl.ts
│   │   │   │   ├── UserRepositoryImpl.ts
│   │   │   │   └── RewardRepositoryImpl.ts
│   │   │   ├── 📁 datasources/
│   │   │   │   └── AdDataSource.ts
│   │   │   └── 📁 local/
│   │   │       └── ads.ts
│   │   ├── 📁 infrastructure/          # Infrastructure Layer
│   │   │   ├── 📁 http/
│   │   │   │   └── HttpClient.ts
│   │   │   ├── 📁 storage/
│   │   │   │   └── LocalStorage.ts
│   │   │   └── 📁 analytics/
│   │   │       └── Analytics.ts
│   │   ├── 📁 presentation/            # Presentation Layer
│   │   │   ├── 📁 hooks/
│   │   │   │   ├── useAds.ts
│   │   │   │   └── useReward.ts
│   │   │   └── 📁 providers/
│   │   │       └── AdProvider.tsx
│   │   ├──  types/
│   │   │   └── ad.ts
│   │   └── 📁 styles/
│   │       └── globals.css
│   ├── package.json
│   └── next.config.ts
├── 📁 android-sdk/                     # Android SDK
│   ├── 📁 samplesdk/
│   │   └── �� src/main/java/com/example/android_sdk/
│   │       ├── 📁 domain/              # Domain Layer
│   │       │   ├── 📁 entities/
│   │       │   │   └── Ad.kt
│   │       │   ├── 📁 repositories/
│   │       │   │   └── AdRepository.kt
│   │       │   └── 📁 usecases/
│   │       │       └── GetAdsUseCase.kt
│   │       ├── 📁 data/                # Data Layer
│   │       │   ├── 📁 repositories/
│   │       │   │   └── AdRepositoryImpl.kt
│   │       │   ├── 📁 datasources/
│   │       │   │   └── AdDataSource.kt
│   │       │   └── 📁 network/
│   │       │       └── ApiService.kt
│   │       ├── 📁 presentation/        # Presentation Layer
│   │       │   └── 📁 viewmodels/
│   │       │       └── AdViewModel.kt
│   │       ├── SampleAdView.kt
│   │       └── SampleAdSdk.kt
│   └── 📁 sample-app/
│       └── 📁 src/main/java/com/example/sample_app/
│           └── MainActivity.kt
└── 📁 puml/
    └── architecture.puml
```

### 4. 주요 최적화 사항

1. **Clean Architecture 적용**: Domain, Data, Presentation 계층 분리
2. **MVVM 패턴**: Android에서 ViewModel과 StateFlow 사용
3. **Repository 패턴**: 데이터 접근 추상화
4. **Use Case 패턴**: 비즈니스 로직 캡슐화
5. **Dependency Injection 준비**: 인터페이스 기반 설계
6. **Error Handling**: 일관된 에러 처리
7. **Type Safety**: TypeScript와 Kotlin 활용
8. **Responsive Design**: 모바일 최적화
9. **Testing 준비**: 단위 테스트 가능한 구조
10. **Scalability**: 확장 가능한 모듈화
