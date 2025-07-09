import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  define: {
    global: 'window', // Required by Solana web3.js
  },
  optimizeDeps: {
    include: ['buffer', 'process']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      buffer: 'buffer',  // 👈 added
      process: 'process/browser' // 👈 added
    }
  },
  plugins: [react()],
});
