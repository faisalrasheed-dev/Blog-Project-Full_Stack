import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return defineConfig({
    plugins: [react()],
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
