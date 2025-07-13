import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    {
      name: 'ignore-external-full-urls',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (!req.url.startsWith('/')) {
            console.warn('Blocked at Vite middleware:', req.url);
            return res.statusCode = 400, res.end('Bad request');
          }
          next();
        });
      }
    }

  ],
   ssr: {
    noExternal: ['react', 'react-dom'], // optional
  },
})
