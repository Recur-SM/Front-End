import { defineConfig } from 'vite'
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://back-end-production-4beb.up.railway.app", // 실제 백엔드 주소
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        app: resolve(__dirname, "app.html"),
      },
      output: {
        manualChunks: {
          // 리액트 관련 라이브러리를 별도 청크로 분리
          "react-vendor": ["react", "react-dom", "react-router-dom"],

          // FullCalendar 관련 라이브러리를 별도 청크로 분리
          calendar: [
            "@fullcalendar/react",
            "@fullcalendar/daygrid",
            "@fullcalendar/core",
          ],

          // 상태 관리 라이브러리
          state: ["zustand"],

          // UI 라이브러리
          ui: ["lucide-react"],

          // 기타 큰 라이브러리들
          vendor: ["axios"],
        },
      },
    },
  },
});
