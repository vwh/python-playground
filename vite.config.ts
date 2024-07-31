import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import compression from "vite-plugin-compression";
import dynamicImport from "vite-plugin-dynamic-import";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/python-playground/",
  plugins: [
    compression(),
    react(),
    dynamicImport(),
    VitePWA({ registerType: "autoUpdate" })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});
