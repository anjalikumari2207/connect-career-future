import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  define: {
    global: 'window', // For Solana web3.js compatibility
  },
  optimizeDeps: {
    include: ['buffer', 'process'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      buffer: 'buffer',
      process: 'process/browser',
    },
  },
  plugins: [react()],
});
