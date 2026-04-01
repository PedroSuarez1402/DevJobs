import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    outDir: 'public/dist',
    manifest: true,
    rollupOptions: {
      input: {
        app: path.resolve(__dirname, 'resources/js/app.js'),
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      }
    },
  },
  server: {
    origin: 'http://localhost:5173',
  },
});
