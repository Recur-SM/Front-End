import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://back-end-production-4beb.up.railway.app', // 실제 백엔드 주소
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
