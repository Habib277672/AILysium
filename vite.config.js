import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        // Split heavy vendor libs into their own long-cached chunks so the
        // app entry stays small and library updates don't invalidate everything.
        codeSplitting: {
          groups: [
            {
              name: 'react-vendor',
              test: /node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/,
            },
            {
              name: 'motion',
              test: /node_modules[\\/](motion|framer-motion)[\\/]/,
            },
            {
              name: 'recharts',
              test: /node_modules[\\/](recharts|d3-|victory-vendor|internmap|delaunator|robust-predicates)[\\/]/,
            },
            {
              name: 'ui-vendor',
              test: /node_modules[\\/](react-icons|react-hot-toast|@tanstack|zustand|lenis|axios)[\\/]/,
            },
          ],
        },
      },
    },
  },
})
