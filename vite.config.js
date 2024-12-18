import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false, // Disable source maps
  },
  server: {
    port: 3000,
  },
  /* esbuild: {
    sourcemap: false, // Disable source maps during development
  }, */
})
