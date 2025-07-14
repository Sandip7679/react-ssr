// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),
//     {
//       name: 'ignore-external-full-urls',
//       configureServer(server) {
//         server.middlewares.use((req, res, next) => {
//           if (!req.url.startsWith('/')) {
//             console.warn('Blocked at Vite middleware:', req.url);
//             return res.statusCode = 400, res.end('Bad request');
//           }
//           next();
//         });
//       }
//     }
//   ],
//    ssr: {
//     noExternal: ['react', 'react-dom'], // optional
//   },
// })



import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    ssr: true, // Enable SSR build
  },
})

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   root: '.', // ⬅️ Make sure root is correctly set
//   appType: 'custom', // since you're using custom SSR
//   server: {
//     middlewareMode: true,
//   }
// });

