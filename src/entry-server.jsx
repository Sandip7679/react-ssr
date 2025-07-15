// import React from "react";
// // import { App } from './App';
// import App from "./App";
// import { renderToString } from "react-dom/server";
// import { StaticRouter } from "react-router-dom";

// export async function render() {
//   // return renderToString(<App/>);
//   // const html = renderToString(<App/>);
//   const html = renderToString(
//     <StaticRouter 
//     // location={url} 
//     // context={context}
//     >
//       <App />
//     </StaticRouter>
//   );
//   // return { html };
//   return html;
// }

// const ctx = {}
// const html = await vueServerRenderer.renderToString(app, ctx)
// // ctx.modules is now a Set of module IDs that were used during the render


import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
// import './index.css'



// Import routes
import Home from './pages/Home';
import About from './pages/About';


const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '*', component: () => <h2>404 - Not Found!</h2> },
];

export async function render(url) {
  // Match route
  const route = routes.find(r => r.path === url) || routes[0];
  const Component = route.component;

  const app = (
    <StaticRouter 
    location={url}
    // context={context} -- Uncomment if you need context for redirects or not found
    >
      <Component />
      {/* <App /> */}
    </StaticRouter>
  );

  const html = renderToString(app);

  // Extract meta
  const meta = Component.meta || {};
  const head = `
    <title>${meta?.title || 'Default Title'}</title>
    <meta name="description" content="${meta?.description || ''}" />
    <meta name="keywords" content="${meta?.keywords || ''}" />
    <meta name="author" content="${meta?.author || ''}" />
    <meta name="robots" content="${meta?.robots || ''}" />
    <meta property="og:image" content="${meta?.image || ''}" />
    <meta property="og:type" content="${meta?.ogType || ''}" />
  `;

  return { html, head };
}