import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],

  resolve: {
    // Prevent "Invalid hook call" by ensuring a single React instance
    dedupe: ['react', 'react-dom'],

    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
