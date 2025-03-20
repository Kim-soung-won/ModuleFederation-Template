import type { Configuration } from '@rspack/cli';
import { rspack } from "@rspack/core";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";
import path from "path";
import { fileURLToPath } from "url";
import deps from "./package.json" with { type: "json" };
import ReactRefreshPlugin from '@rspack/plugin-react-refresh';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDev = process.env.NODE_ENV === 'development';

const de = deps.dependencies;

const config: Configuration = {
  entry: {
    main: "./src/index.tsx",
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx', '.json'],
  },
  devtool: 'source-map',
  optimization: {
    minimize: false,
  },
  output: {
    uniqueName: "remote",
    path: path.resolve(__dirname, "./dist"), // __dirname 사용
    publicPath: 'http://localhost:3001/',
  },
  
  // Rspack css 처리 기능 활성화
  experiments: {
    css: true,
  },

  devServer: {
    port: 3001,
    historyApiFallback: true, // 모든 경로를 index.html로 리다이렉트    
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
    }
  },

  plugins: [
    new rspack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    isDev ? new ReactRefreshPlugin() : null,
    new rspack.ProgressPlugin({}),
    
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
    new ModuleFederationPlugin({
      name: "remote",
      exposes: {
        "./RemoteRoute": "./src/export/remote-routes.tsx",
      },
      // shared 설정 안할시 context 오류 발생
      shared: {        
        react: { 
          requiredVersion: "18.2.0"
        } ,
        "react-dom": {
          requiredVersion: "18.2.0" ,
        },
        "react-router": {
          requiredVersion: "^7.3.0" ,
        },
      },
    })

  ],

  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset',
      },
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: /(node_modules|\.webpack)/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              sourceMap: true,
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
              env: {
                targets: ['chrome >= 87', 'edge >= 88', 'firefox >= 78', 'safari >= 14'],
              },
            },
          },
        ],
      },
    ],
  },
}

export default config;