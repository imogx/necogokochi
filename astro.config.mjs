import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://imurar.github.io",
  base: "/necogokochi",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
