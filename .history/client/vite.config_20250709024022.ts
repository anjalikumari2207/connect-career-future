// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      buffer: "buffer",
      process: "process/browser",
      stream: "stream-browserify",
      util: "util",
    },
  },
  define: {
    global: "window", // required for some libraries
  },
  optimizeDeps: {
    include: ["buffer", "process", "stream", "util"],
  },
});
