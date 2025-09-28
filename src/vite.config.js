/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,           // use global test functions like `test`, `expect`
    environment: "jsdom",    // simulate browser environment
    setupFiles: "./src/setupTests.js", // optional setup file
  },
});
