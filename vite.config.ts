import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // Chunk boyutu uyarı limitini 600kb'ya çıkar (varsayılan 500)
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Vendor chunking: büyük kütüphaneleri ayrı chunk'a al
        // → tarayıcı cache'i daha iyi kullanır, yalnızca değişen chunk indirilir
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-helmet': ['react-helmet-async'],
        },
      },
    },
  },
})
