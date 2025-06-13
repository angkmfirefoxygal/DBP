import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server : {
     proxy: {
      '/auth': {
        target: 'http://localhost:8080',
        changeOrigin:true,
      },

       '/spend': {
        target: 'http://localhost:8080', // 스프링 서버 주소
        changeOrigin: true,
      },
    },
  },
})
