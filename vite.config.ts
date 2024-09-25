import vue from '@vitejs/plugin-vue';
import path from "path";
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
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
    },
  },
  plugins: [vue(),
  viteStaticCopy({
    targets: [
      {
        src: 'src/assets/pictures', // Copy all assets
        dest: 'assets' // Destination in the dist folder
      }
    ]
  }),
  ],

  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["legacy-js-api"],
        additionalData: `
          @import "./src/assets/variables.scss";
        `,

      }
    }
  }
})
