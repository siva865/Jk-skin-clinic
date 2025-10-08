import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    // 👇 This line makes sure refreshing sub-pages (like /about or /contact) won’t show 404
    historyApiFallback: true,
  },
  // 👇 Optional but recommended for production build (especially on Netlify/Vercel)
  build: {
    outDir: "dist",
  },
});
