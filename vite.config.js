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



// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     ssr: true, // Enable SSR build
//   },
//   server: {
//     middlewareMode: true,
//     allowedHosts: ['react-ssr-7bu1.onrender.com'], // ✅ Add your render.com domain here
//   },
// })



// vite.config.js
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig(({ command, ssrBuild }) => {
//   const isSSR = !!ssrBuild;

//   return {
//     plugins: [react()],
//     appType: 'custom',
//     build: {
//       outDir: isSSR ? 'dist/server' : 'dist/client',
//       ssr: isSSR ? 'src/entry-server.jsx' : false,
//       ssrManifest: !isSSR, // required only for client build
//       rollupOptions: {
//         input: isSSR ? undefined : 'index.html', // only needed for client
//       }
//     },
//     server: {
//       middlewareMode: true,
//       allowedHosts: ['react-ssr-7bu1.onrender.com'],
//     }
//   };
// });




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






import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode, ssrBuild }) => ({
  plugins: [
    react(
      {
        // Use the automatic JSX runtime
        jsxRuntime: 'automatic',
        // Disable development mode for production builds
        jsxDev: mode !== 'production',
      }
    ),
  ],
  appType: 'custom',
  build: ssrBuild
    ? {
        ssr: 'src/entry-server.jsx', // for SSR build
        outDir: 'dist/server',
        rollupOptions: {
          input: 'src/entry-server.jsx',
        },
      }
    : {
        outDir: 'dist/client',
        rollupOptions: {
          input: 'index.html', // for client build
        },
      },
      server: {
        middlewareMode: true,
        allowedHosts: ['react-ssr-7bu1.onrender.com'],
      },
}));


