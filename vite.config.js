/*import vue from '@vitejs/plugin-vue';

export default {
    plugins: [vue()]
} */

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true, // slik at du kan kjøre på mobil via lokalnett
    port: 5173, // standardport for vite
  },
})

