import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://back-end-production-4beb.up.railway.app",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: "index.html", 
        app: "app.html",
      },
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          calendar: ["@fullcalendar/react", "@fullcalendar/daygrid", "@fullcalendar/core"],
          state: ["zustand"],
          ui: ["lucide-react"],
          vendor: ["axios"],
        },
      },
    },
  },
});