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

// Объявляем модуль markdown-it для TypeScript
declare module 'markdown-it' {
  import { PluginSimple, PluginWithOptions } from 'markdown-it'
  
  interface MarkdownItOptions {
    html?: boolean
    breaks?: boolean
    linkify?: boolean
    typographer?: boolean
    quotes?: string
    langPrefix?: string
    [key: string]: any
  }
  
  class MarkdownIt {
    constructor(presetName?: string, options?: MarkdownItOptions)
    render(md: string, env?: any): string
    renderInline(md: string, env?: any): string
    use(plugin: PluginSimple | PluginWithOptions, ...params: any[]): MarkdownIt
  }
  
  export default MarkdownIt
}