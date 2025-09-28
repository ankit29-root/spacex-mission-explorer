/// <reference types="vitest" />   // 👈 Add this line at the very top
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,          // Allows using describe/it/expect globally
    environment: 'jsdom',   // Simulates a browser environment for testing
    setupFiles: './src/setupTests.js', // Runs before each test
  },
})
