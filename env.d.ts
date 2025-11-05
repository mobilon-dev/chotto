/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Объявляем модуль для .tgs файлов, чтобы TypeScript понимал импорты файлов этого типа как строки (URL)
declare module '*.tgs' {
  const src: string
  export default src
}