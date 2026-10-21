import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/api/auth": {
        // Add this specific rule for Better Auth
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
