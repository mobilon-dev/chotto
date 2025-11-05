import path from "path";
import { defineConfig } from 'vite';

// Конфигурация для сборки CSS тем
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  build: {
    outDir: 'dist/themes',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        'default': path.resolve(__dirname, 'src/themes/default/theme-only.scss'),
        'dark': path.resolve(__dirname, 'src/themes/dark/theme-only.scss'),
        'green': path.resolve(__dirname, 'src/themes/green/theme-only.scss'),
        'mobilon1': path.resolve(__dirname, 'src/themes/mobilon1/theme-only.scss'),
      },
      output: {
        assetFileNames: '[name].css'
      },
      external: (id) => {
        // Исключаем шрифты из сборки тем
        return id.includes('@fontsource') || id.includes('fonts');
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  }
})
