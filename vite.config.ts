import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // devOptions: { enabled: true },
      includeAssets: ['favicon.ico', 'favicon.svg', 'apple-touch-icon.png', 'qr.png'],
      manifest: {
        name: 'Qwixx',
        short_name: 'Qwixx',
        description: 'Qwixx Scoresheet',
        theme_color: 'white',
        background_color: 'white',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
        ],
      },
    })
  ],
  base: '/qwixx/',
  server: {
    host: true,
  },
})
