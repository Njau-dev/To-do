import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,  // Ensures source maps are generated for production builds
  },
  server: {
    port: 5176  // Enables source maps for development server
  },
  esbuild: {
    sourcemap: 'inline', // Inline source maps for easier debugging in development
  },
});
