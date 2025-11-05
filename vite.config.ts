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
      fileName: (format) => `vuessages.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
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
