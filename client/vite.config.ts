import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // your frontend dev port
    strictPort: true,
    cors: true,
    proxy: {
      // Proxy API calls to Fastify backend during dev
      '/api': {
        target: 'http://localhost:5000', // your backend
        changeOrigin: true,
        secure: false,
      },
    },
    headers: {
      // Relax CSP for development
      'Content-Security-Policy': "default-src * 'self' 'unsafe-inline' 'unsafe-eval' data: blob:;",
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
