import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    cors: true,
    proxy: {
      '/api': {  // Update this line
        target: 'http://localhost:5000',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api\/v1/, '/api/v1'), // Keep path unchanged
        secure: false,
      },
    },
    headers: {
      "Content-Security-Policy": [
        "default-src 'self'",
        "connect-src 'self' http://localhost:5000 ws://localhost:5173 https://*.supabase.co https://api.paystack.co https://images.pexels.com",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.paystack.co",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "img-src 'self' data: blob: https://*.supabase.co https://images.pexels.com",
        "font-src 'self' https://fonts.gstatic.com",
        "frame-src https://js.paystack.co",
        "worker-src 'self' blob:"
      ].join('; '),
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Allow-Credentials': 'true'
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: [
      '@supabase/supabase-js',
      'react',
      'react-dom',
      'react-router-dom'
    ],
  },
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 1600,
  },
});