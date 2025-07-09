import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// ✅ Updated Vite config with buffer polyfill and global alias
export default defineConfig(({ mode }) => ({
  server: {
    proxy: {
      "/api": "http://localhost:8080",
    },
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      buffer: "buffer", // ✅ polyfill for Buffer
    },
  },
  define: {
    global: "window", // ✅ required for Solana/web3.js and buffer to work
  },
  optimizeDeps: {
    include: ["buffer"], // ✅ ensures buffer is bundled by Vite
  },
}));
