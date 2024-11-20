/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv
}
interface ImportMetaEnv {
  readonly BASE_URL: string
  readonly MODE: string

  readonly PUBLIC_GIT_SHORT_VER: string
  readonly PUBLIC_GIT_TIME: string
}
