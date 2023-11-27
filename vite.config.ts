import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [ vue() ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/scss/index.scss";`
        }
      }
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    },
    build: {
      outDir: "./public"
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV)
    }
  }
});
