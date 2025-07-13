import express from "express";
import { createServer as createViteServer } from "vite";
import { readFile } from "fs/promises";
import path from "path";
// import pkg from 'express/package.json'; // Import package.json for version

const app = express();
// console.log("express version:", express.version); // Log the Express version
// console.log('express version:', pkg.version);

// console.log("this is the server/index.js file");
const root = process?.cwd();
console.log("this is the root:", root);

async function start() {
  const vite = await createViteServer({
    root,
    server: { middlewareMode: "ssr" },
  });

  //  app.use((req, res, next) => {
  //     const url = req.originalUrl;

  //     //  BLOCK requests that are not relative paths
  //     if (!url.startsWith('/')) {
  //       console.warn('Blocked malformed request:', url);
  //       return res.status(400).send('Bad request');
  //     }

  //     next();
  //   });

  app.use(vite?.middlewares);
  //   console.log('this is the vite middlewares:', vite?.middlewares);

  // app.use("/*", async (req, res) => {
  //   console.log('this is the req:', req);
  //   try {
  //     if (!req.originalUrl?.startsWith("/")) {
  //       return res.status(400).send("Invalid URL");
  //     }
  //   console.log('test...');
  //   // console.log('req.originalUrl:', req?.originalUrl);
  //     const url = req.originalUrl;
  //     console.log('url..', url);
  //     let template = await readFile(path.resolve("index.html"), "utf-8");
  //     template = await vite.transformIndexHtml(url, template);

  //     const { render } = await vite.ssrLoadModule("/src/entry-server.jsx");
  //     const { html } = await render();

  //     const finalHtml = template.replace(`<!--ssr-outlet-->`, html);
  //     res.status(200).set({ "Content-Type": "text/html" }).end(finalHtml);
  //   } catch (e) {
  //       console.log('first error:', e);
  //     vite.ssrFixStacktrace(e);
  //     console.error(e);
  //     res.status(500).end(e.message);
  //   }
  // });

  app.use(async (req, res, next) => {
    const url = req.originalUrl;

    // Block malformed full URLs
    if (!url.startsWith("/")) {
      return res.status(400).send("Bad request");
    }

    // If it's a GET request and expects HTML, SSR it
    if (req.method === "GET" && req.headers.accept?.includes("text/html")) {
      try {
        let template = await readFile(path.resolve("index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        const { render } = await vite.ssrLoadModule("/src/entry-server.jsx");
        const { html } = await render();
        const finalHtml = template.replace(`<!--ssr-outlet-->`, html);
        return res
          .status(200)
          .set({ "Content-Type": "text/html" })
          .end(finalHtml);
      } catch (e) {
        vite.ssrFixStacktrace(e);
        console.error("SSR Error:", e);
        return res.status(500).end(e.message);
      }
    }

    // Let other assets (CSS, JS, API) pass through
    next();
  });

  app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });
}

start();
