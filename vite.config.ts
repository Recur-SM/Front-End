import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: './',
  
  resolve: {
    alias: {
      '@src-app': path.resolve(__dirname, './src-app'),
      '@src-web': path.resolve(__dirname, './src-web'),
    },
  },

  server: {
    port: 5173,
    open: true,
  }
})