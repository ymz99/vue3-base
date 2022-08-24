import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv  } from 'vite'
import vue from '@vitejs/plugin-vue'

const devEnv = loadEnv('development', './envDir')
const proEev = loadEnv('production', './envDir')

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

  return {
    envDir: './envDir',
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy :{
        '/': {
          target: command === 'serve' ? devEnv.VITE_BASE_URL : proEev.VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }

  }
})
