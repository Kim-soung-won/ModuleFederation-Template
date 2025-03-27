import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { pluginStyledComponents } from "@rsbuild/plugin-styled-components";
import path from "path";
import { fileURLToPath } from "url";
import deps from "./package.json" with { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDev = process.env.NODE_ENV === 'development';

const de = deps.dependencies;

export default defineConfig({
  server: {
    port: 3000,
    cors: true,
    open: '/',
    proxy: {

    }
  },
  
  plugins: [
    pluginReact(),
    pluginStyledComponents(),
    pluginModuleFederation({
      name: "host",
      shared: {
        react: { singleton: true, requiredVersion: de.react },
        "react-dom": { singleton: true, requiredVersion: de["react-dom"] },
        "react-router": { singleton: true, requiredVersion: de["react-router"] },
      }
    })
  ],  
});
