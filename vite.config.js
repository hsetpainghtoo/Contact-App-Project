import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import jsonServer from "vite-plugin-simple-json-server";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    jsonServer(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
