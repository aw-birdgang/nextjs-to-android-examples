---

## 1. Web Frontend (Next.js) 설치 및 실행

### 1-1. 의존성 설치

```bash
cd web-frontend
npm install
```

### 1-2. 개발 서버 실행

```bash
npm run dev
```

- 기본적으로 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

### 1-3. 프로덕션 빌드

```bash
npm run build
npm start
```

---

## 2. Android SDK & 샘플 앱 빌드 및 실행

### 2-1. Android SDK 프로젝트로 이동

```bash
cd ../android-sdk
```

### 2-2. Gradle 의존성 새로고침 및 클린 빌드

```bash
./gradlew --refresh-dependencies
./gradlew clean
```

### 2-3. 샘플 앱 디버그 빌드

```bash
./gradlew :sample-app:assembleDebug
```

### 2-4. 에뮬레이터/실기기에 APK 설치

```bash
adb install -r sample-app/build/outputs/apk/debug/sample-app-debug.apk
```

### 2-5. 샘플 앱 실행

```bash
adb shell am start -n com.example.sample_app/.MainActivity
```

---

## 3. Android 샘플 앱에서 Next.js 광고 연동 테스트

- **샘플 앱**은 내부적으로 `WebView`를 통해 `http://localhost:3000`(Next.js 서버)로 접속합니다.
- 반드시 **web-frontend** 개발 서버가 실행 중이어야 합니다.
- 에뮬레이터에서는 `localhost` 대신 `10.0.2.2`로 접근합니다.
- 광고 목록, 상세, 리워드 등 주요 기능이 정상적으로 동작하는지 확인하세요.

---

## 4. 주요 기술 스택

- **Web Frontend**: Next.js, React, TypeScript, Tailwind CSS, Zustand (상태관리)
- **Android SDK/샘플 앱**: Kotlin, MVVM, Hilt(DI), Retrofit2, Coroutines, WebView

---

## 5. 자주 발생하는 문제 & 해결법

- **Hilt 플러그인 인식 오류**
  - `android-sdk/settings.gradle.kts`에 `google()` 저장소가 반드시 포함되어야 합니다.
  - `android-sdk/build.gradle.kts`에 Hilt classpath가 반드시 포함되어야 합니다.
- **WebView에서 광고가 안 뜨는 경우**
  - Next.js 서버가 실행 중인지 확인하세요.
  - 에뮬레이터에서는 `10.0.2.2:3000`으로 접근해야 합니다.
- **Gradle/플러그인 버전 경고**
  - 최신 Android Studio/Gradle로 업그레이드 권장 (경고는 무시해도 빌드/실행 가능)

---

## 6. 참고/추가 정보

- **Android Studio**에서 `android-sdk` 폴더만 "Open as Project" 하세요.
- **web-frontend**는 VSCode 등에서 별도로 관리하면 편리합니다.
- 추가적인 구조/아키텍처 설명은 [puml/architecture.puml](puml/architecture.puml) 참고

---

