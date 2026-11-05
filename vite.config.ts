import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: "es2022",
    cssCodeSplit: false,
    rolldownOptions: {
      output: {
        // vendor code changes rarely — keep it in its own long-cached chunks
        codeSplitting: {
          groups: [
            { name: "react", test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
            { name: "motion", test: /node_modules[\\/](motion|framer-motion|motion-dom|motion-utils|lenis)[\\/]/ },
          ],
        },
      },
    },
  },
});
