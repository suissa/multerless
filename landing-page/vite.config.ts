import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8321,
    watch: {
      usePolling: true,
      interval: 300,
    },
    hmr: {
      overlay: true,
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 8321,
    allowedHosts: [
      "multerless.purecore.codes",
      "multerless.purecore.codes:443",
      "multerless.purecore.codes:8321",
    ],
  },
  plugins: [
    react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
