import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from "@module-federation/vite";
import { NativeFederationTypeScriptHost,NativeFederationTypeScriptRemote } from '@module-federation/native-federation-typescript/vite';
import { 
  getFederationShared, 
  getFederationRemoteForTypescriptLib, 
  getFederationRemoteForRemoteEntry,
  getAutoExposes,
//@ts-ignore
} from "./mfe-config";
import { resolve } from 'path';

export default ({ mode }) => {

  const env = loadEnv(mode, process.cwd(), '');

  /**
   * Vite Plugin Federation 설정
   * name: Remote App 이름
   * filename: Remote Entry 파일 이름 Default: remoteEntry.js
   * exposes: 노출할 모듈 설정
   * 출처: https://module-federation.io/guide/basic/vite.html
   */
  const moduleFederationConfig = {
    name : env.VITE_MODULE_NAME,
    filename: env.VITE_REMOTE_FILENAME,
    remotes: getFederationRemoteForTypescriptLib(),
    exposes: getAutoExposes({
      baseUrl: env.VITE_REMOTE_COMP_BASE_NAME,
      baseFilePath: env.VITE_REMOTE_COMP_DEFAULT_PATH,
      moduleName: env.VITE_MODULE_NAME
    }),
    shared: getFederationShared(),
  }

  return defineConfig({
    plugins: [
      react(),
      (mode !== "development" && [
        federation({
          ...moduleFederationConfig,
          remotes: getFederationRemoteForRemoteEntry(),
        })]),
      (mode === "pull" && 
        NativeFederationTypeScriptHost({
          moduleFederationConfig
        })),
      (mode === "exposes" && [
        NativeFederationTypeScriptRemote({
          moduleFederationConfig
        }),
      ])
    ],

    build: {
      outDir: "dist", // 출력 디렉토리
      assetsDir: "assets", // 정적 자산 디렉토리
      sourcemap: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
        },
        output: {
          // 에셋 파일 이름 규칙 설정
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split(".");
            const extType = info[info.length - 1];

            const fontFileRegex = /\.(ttf|eot|woff|woff2|svg)(\?t=[\d]+)?$/i;

            if (fontFileRegex.test(assetInfo.name)) {
              const fileName = assetInfo.name.split("?")[0];
              return `fonts/${fileName}`;
            }

            return `assets/[name]-[hash][extname]`;
          },
        },
      },
      modulePreload: false, // 각 리모트 앱이 독립적으로 로드되어야 하므로 사전 로드 비활성화
      target: "esnext", // 최신 ECMAScript 표준 지원
      minify: false, // 코드 압축 비활성화하여 디버깅 용이하도록 설정
      cssCodeSplit: true, // CSS 코드 분할 비활성화하여 스타일 충돌 방지
    },
  })
}
