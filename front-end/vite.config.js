import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return defineConfig({
    plugins: [react(),tailwindcss()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL_LOCAL, 
          changeOrigin: true,
        },
      },
    },
  })
}
