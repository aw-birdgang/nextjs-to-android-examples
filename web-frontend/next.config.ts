import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "http://10.0.2.2:3000", // Android 에뮬레이터에서 접근 허용
    "http://localhost:3000", // 로컬 브라우저 접근 허용
    // 필요시 추가
  ],
};
export default nextConfig;
