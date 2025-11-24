import vue from '@vitejs/plugin-vue';
import path from "path";
import { defineConfig } from 'vite';
// import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.tgs'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: "vuessages",
      formats: ['es'],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        format: 'es',
        preserveModules: true,
        preserveModulesRoot: 'src',
        exports: "named",
        entryFileNames: '[name].js',
        // Сохраняем структуру директорий для модулей
        chunkFileNames: '[name].js',
        assetFileNames: (assetInfo) => {
          // CSS файлы в корень dist
          if (assetInfo.name?.endsWith('.css')) {
            return 'chotto.css';
          }
          return '[name][extname]';
        },
      },
      // Игнорируем предупреждения об eval в библиотечных файлах tgs-player
      onwarn(warning, warn) {
        // Игнорируем предупреждения об eval в локальных копиях библиотек
        if (
          warning.code === 'EVAL' &&
          (warning.id?.includes('tgs-player') || warning.id?.includes('lottie-player'))
        ) {
          return;
        }
        warn(warning);
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // or "modern"
      }
    }
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Указываем Vue, что tgs-player и lottie-player - это нативные веб-компоненты (Custom Elements),
          // а не Vue-компоненты, чтобы избежать ошибок при их использовании в шаблонах
          isCustomElement: (tag) => tag === 'tgs-player' || tag === 'lottie-player'
        }
      }
    }),
  ],
})
