import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

const version = new Date().getTime().toString()

if (!fs.existsSync('public')) {
  fs.mkdirSync('public')
}
fs.writeFileSync('public/version.json', JSON.stringify({ version }))

export default defineConfig({
  define: {
    '__APP_VERSION__': JSON.stringify(version),
  },
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    open: false,
    allowedHosts: ['vsc.skick.xyz', '.vsc.skick.xyz', 'localhost'],
  },
})
