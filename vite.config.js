import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";

const MUNCHER_ASSETS = path.resolve(
  "node_modules/pankosmia-text_translation-muncher/munchersPackageExport/assets",
);

// Pre-bundling moves the muncher into .vite/deps, so its worker URLs
// (new URL("assets/x.worker-*.js", import.meta.url)) must be served from the package.
function munchersWorkerAssets() {
  return {
    name: "muncher-worker-assets",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const match =
          /\/\.vite\/deps\/assets\/([\w.-]+\.worker-[\w-]+\.js)(\?.*)?$/.exec(
            req.url,
          );
        const file = match && path.join(MUNCHER_ASSETS, match[1]);
        if (!file || !fs.existsSync(file)) return next();
        res.setHeader("Content-Type", "text/javascript");
        fs.createReadStream(file).pipe(res);
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), munchersWorkerAssets()],
  server: {
    port: 5173, // Unique port for local_projects
    strictPort: true,
    host: "0.0.0.0",
    cors: true,
    proxy: {
      "/api": { target: "http://127.0.0.1:19119", changeOrigin: true },
    },
  },

  build: {
    outDir: "build",
    emptyOutDir: true,
    sourcemap: true,
  },
  base: "/clients/ensemble-workspace/",
});
