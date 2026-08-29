import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const localAllowedHosts = (env.VITE_EXTRA_ALLOWED_HOSTS || '')
    .split(',')
    .map(host => host.trim())
    .filter(Boolean)

  return {
    plugins: [react()],
    base: './',
    publicDir: 'public', // public目录中的文件会自动复制到dist目录
    server: {
      allowedHosts: ['www.baishengtrading.com', ...localAllowedHosts],
    },
  }
})
