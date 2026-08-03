import { fileURLToPath, URL } from 'node:url'
import { env } from 'node:process'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: env.VERCEL ? '/' : '/todo-list/',

  plugins: [vue()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})