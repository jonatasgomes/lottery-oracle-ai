import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // Use relative base path so the app works seamlessly on GitHub Pages (subpaths) and Vercel (root)
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
