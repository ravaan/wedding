import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

function flowerSavePlugin() {
  return {
    name: "flower-save",
    configureServer(server) {
      server.middlewares.use("/api/save-flowers", (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end("Method not allowed");
          return;
        }
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
          try {
            const data = JSON.parse(body);
            const filePath = path.resolve("src/data/flowerLayout.json");
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ok: true }));
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [flowerSavePlugin(), react()],
  base: "/",
  server: { host: true },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["framer-motion", "lucide-react"],
          forms: ["react-hook-form"],
          analytics: ["mixpanel-browser"],
          utils: ["dayjs", "canvas-confetti"],
        },
      },
    },
  },
});
