import path from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === 'tgs-player' || tag === 'lottie-player',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: [
      'src/**/__tests__/**/*.{test,spec}.{ts,tsx}',
      'scripts/**/__tests__/**/*.{test,spec}.{ts,tsx}',
    ],
    exclude: [
      'node_modules',
      'dist',
      'docs',
      'src/apps/**',
      '**/*.stories.ts',
      '**/*.stories.tsx',
    ],
    coverage: {
      provider: 'v8',
      include: [
        'src/functions/**',
        'src/hooks/validators/**',
        'src/hooks/uploadFile/**',
      ],
      exclude: [
        'src/**/__tests__/**',
        'src/**/index.ts',
        'src/**/*.d.ts',
        'src/**/*.md',
        'src/**/use*.ts',
        'src/functions/playNotificationAudio.ts',
        'src/functions/safeMediaPlay.ts',
        'src/functions/getChannelAccentColor.ts',
      ],
    },
  },
})
