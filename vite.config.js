import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/wedding/',
  server: {
    // This ensures the dev server handles the base path correctly
    // and redirects properly for SPA routing
    historyApiFallback: {
      index: '/wedding/index.html'
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', 'lucide-react'],
          forms: ['react-hook-form'],
          analytics: ['mixpanel-browser'],
          utils: ['dayjs', 'canvas-confetti']
        }
      }
    }
  }
})