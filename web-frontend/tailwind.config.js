/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1e40af", // 더 진한 파랑
          light: "#3b82f6",
          dark: "#1e3a8a",
        },
        secondary: {
          DEFAULT: "#dc2626", // 빨간색으로 변경
        },
        accent: {
          DEFAULT: "#059669", // 진한 초록
        },
        bg: {
          DEFAULT: "#ffffff", // 흰색 배경
        },
        text: {
          DEFAULT: "#111827", // 진한 회색
        },
      },
    },
  },
  plugins: [],
};
