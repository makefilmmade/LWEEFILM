import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/LWEEFILM/", // ← GitHub Pages 배포 경로와 동일하게
});
