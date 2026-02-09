import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-router-dom', '@tanstack/react-query', '@fullcalendar/react'],
        },
      },
    },
  },
})