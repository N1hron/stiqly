import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  optimizeDeps: {
    exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util'],
  },
  server: {
    host: true,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  resolve: {
    alias: {
      '@icons': path.resolve(__dirname, './src/assets/icons'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@store': path.resolve(__dirname, './src/store'),
      '@slices': path.resolve(__dirname, './src/store/slices'),
      '@types': path.resolve(__dirname, './src/types.ts'),
      '@constants': path.resolve(__dirname, './src/constants.ts'),
      '@/ffmpeg': path.resolve(__dirname, './src/ffmpeg'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
});
