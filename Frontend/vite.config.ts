

// vite.config.ts
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default {
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
}


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'


// https://vite.dev/config/

// export default defineConfig({
//   plugins: [react()],
// })
