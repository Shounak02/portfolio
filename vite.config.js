import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true,     // allows access from other devices on the network
    port: 5173,     // optional: set a fixed port
    strictPort: true, // ensures it doesn’t auto-switch ports
    open: true,     // optional: opens the browser automatically
  },
})
