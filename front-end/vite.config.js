import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api':{
        target:'https://l5gf2qgc-8000.inc1.devtunnels.ms',
        changeOrigin:true
      }
    }
  }
})
