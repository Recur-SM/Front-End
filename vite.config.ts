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
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        app: resolve(__dirname, "app.html"),
      },
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          calendar: [
            "@fullcalendar/react",
            "@fullcalendar/daygrid",
            "@fullcalendar/core",
          ],
          state: ["zustand"],
          ui: ["lucide-react"],
          vendor: ["axios"],
        },
      },
    },
  },
});