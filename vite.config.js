import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { resolve } from 'path'
export default defineConfig({
  plugins: [
    vue(),
    cssInjectedByJsPlugin(),
  ],
  define: { 'process.env.NODE_ENV': '"production"' },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.js'),
      name: 'sdk',
      fileName: 'sdk'
    }
  },
})