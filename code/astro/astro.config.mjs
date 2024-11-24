import { defineConfig } from 'astro/config'
import svelte from '@astrojs/svelte'
import react from '@astrojs/react'
import UnoCSS from 'unocss/astro'
import node from '@astrojs/node'

import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  integrations: [
    svelte(),
    react(),
    UnoCSS({
      injectReset: true,
      configFile: './uno.config.ts',
    }),
  ],
  output: 'server',
  adapter: vercel(),
  // github pages
  // https://www.cmsoftdev.com/01-github-deploy/
  build: {
    assets: 'assets',
  },
})
