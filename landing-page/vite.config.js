import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8001,
    watch: {
      usePolling: true,
      interval: 300,
    },
    hmr: {
      overlay: true,
    },
  },
  preview: {
    host: "0.0.0.0",     // permite preview externo
    port: 8001,
    allowedHosts: ["multerless.purecore.codes"], // <-- linha que corrige o erro
  },
  plugins: [
    react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
