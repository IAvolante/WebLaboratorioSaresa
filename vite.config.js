import fs from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Si existe public/CNAME (dominio propio conectado en GitHub Pages) o CUSTOM_DOMAIN=true, usa '/' automáticamente
const hasCustomDomain =
  process.env.CUSTOM_DOMAIN === 'true' || fs.existsSync('./public/CNAME')

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS && !hasCustomDomain ? '/WebLaboratorioSaresa/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  server: {
    watch: {
      ignored: ['**/public/banners/**'],
    },
  },
})
