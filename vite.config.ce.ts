import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue({ features: { customElement: true }})],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  publicDir: false,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ce.ts', import.meta.url)),
      name: 'AppsheroesUi',
      formats: ['iife'],
      fileName: () => 'appsheroes-ui.js',
    },
    cssCodeSplit: false,
    outDir: 'dist/web',
  },
})
