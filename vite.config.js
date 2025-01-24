import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ["quill"],
  },

  build: {
    rollupOptions: {
      external: ["debug"],
      output: {
        format: "es",
      },
    },
  },

  assetsInclude: ["**/*.xlsx"],

  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://lppm.sinus.ac.id",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
