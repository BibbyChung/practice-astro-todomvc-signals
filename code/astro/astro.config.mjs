import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";
import analogjsangular from "@analogjs/astro-angular";
import UnoCSS from "unocss/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [
    svelte(),
    react(),
    analogjsangular(),
    UnoCSS({
      injectReset: true
    })
  ]
});
