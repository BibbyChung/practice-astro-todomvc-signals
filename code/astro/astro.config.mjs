import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";
import UnoCSS from "unocss/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [
    svelte(),
    react(),
    UnoCSS({
      injectReset: true,
      configFile: './uno.config.ts'
    })
  ]
});
