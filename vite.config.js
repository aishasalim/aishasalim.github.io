import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // ← Add this

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 5173,
    open: true,
    cors: {
      origin: '', // Allow all origins
      methods: '',
      allowedHeaders: '*',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // ← This is the key part!
    },
  },
});
