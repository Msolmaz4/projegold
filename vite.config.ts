import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
    css: true,
  },

  define: {
    global: "window",
  },

  build: {
    sourcemap: true,
  },
  resolve: {
    alias: [
      {
        find: "authentication",
        replacement: resolve(__dirname, "./src/authentication"),
      },
      {
        find: "components",
        replacement: resolve(__dirname, "./src/components"),
      },
      {
        find: "config",
        replacement: resolve(__dirname, "./src/config"),
      },
      {
        find: "context",
        replacement: resolve(__dirname, "./src/context"),
      },
      {
        find: "core",
        replacement: resolve(__dirname, "./src/core"),
      },
      {
        find: "hooks",
        replacement: resolve(__dirname, "./src/hooks"),
      },
      {
        find: "icons",
        replacement: resolve(__dirname, "./src/icons"),
      },
      {
        find: "layout",
        replacement: resolve(__dirname, "./src/layout"),
      },
      {
        find: "modules",
        replacement: resolve(__dirname, "./src/modules"),
      },
      {
        find: "options",
        replacement: resolve(__dirname, "./src/options"),
      },
      {
        find: "queryClient",
        replacement: resolve(__dirname, "./src/queryClient.ts"),
      },
      {
        find: "routes",
        replacement: resolve(__dirname, "./src/routes"),
      },
      {
        find: "types",
        replacement: resolve(__dirname, "./src/types"),
      },
      {
        find: "utils",
        replacement: resolve(__dirname, "./src/utils"),
      },
    ],
  },
});
