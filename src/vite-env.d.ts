/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_THEME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
