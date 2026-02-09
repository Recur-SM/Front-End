import { defineConfig } from "vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        app: resolve(__dirname, "app.html"),
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://back-end-production-4beb.up.railway.app", // 실제 백엔드 주소
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
