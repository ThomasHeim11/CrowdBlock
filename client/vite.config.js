// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      external: ["@safe-globalThis/safe-ethers-adapters"],
    },
  },
});
