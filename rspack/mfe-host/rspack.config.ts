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
    uniqueName: "host",
    path: path.resolve(__dirname, "./dist"), // __dirname 사용
    publicPath: 'http://localhost:3000/',
  },
  
  // Rspack css 처리 기능 활성화
  experiments: {
    css: true,
  },

  devServer: {
    port: 3000,

    historyApiFallback: true, // 모든 경로를 index.html로 리다이렉트 Required
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  
    static: {
      directory: path.resolve(__dirname, "src/assets"),
      publicPath: "/assets",
    },
  },

  plugins: [
    new rspack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    isDev ? new ReactRefreshPlugin() : null,
    new rspack.ProgressPlugin({}),
    
    new rspack.HtmlRspackPlugin({
      template: path.resolve(__dirname, "./index.html"),
    }),
    new ModuleFederationPlugin({
      name: "host",
      // remote module 설정은 Code Level로 이동
      
      // shared 설정은 Config에서 필수
      shared: {        
        react: {
          singleton: true, 
          requiredVersion: "18.2.0" 
        } ,
        "react-dom": {
          singleton: true, requiredVersion: "18.2.0" ,
        },
        "react-router": {
          singleton: true, requiredVersion: "^7.3.0" ,
        },
      },
    })

  ],

  module: {
    generator: {
      'css/auto': {
        exportsConvention: 'as-is',
        localIdentName: '[hash]-[local]',
      },
    },
    rules: [
      // 이미지 파일 처리
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]",
        }
      },
      // 폰트 파일 처리
      {
        test: /\.(ttf|woff|woff2|eot)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
      // JavaScript 파일 처리
      {
        test: /\.(js|jsx|ts|tsx)$/i,
        include: /src/,
        loader: "builtin:swc-loader", // Rspack 내장 SWC 로더 사용
        options: {
          jsc: {
            parser: { syntax: "typescript", tsx: true },
            transform: { react: { runtime: "automatic" } },
          },
        },
        type: "javascript/auto",
      },
      // SCSS 파일 처리
      {
        test: /\.scss$/,
        use: 'sass-loader',
        type: "css/auto",
        options: {
          jsc: {
            parser: { syntax: "typescript", tsx: true },
            transform: { react: { runtime: "automatic" } },
          },
        }
      },
    ],
  },
}

export default config;