import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import UnoCSS from "unocss/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [
    svelte(),
    react(),
    vue(),
    UnoCSS({
      injectReset: true,
      configFile: './uno.config.ts'
    })
  ]
});
