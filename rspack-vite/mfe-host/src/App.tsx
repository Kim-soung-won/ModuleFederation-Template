import "./App.css";
import { init, preloadRemote } from "@module-federation/enhanced/runtime";
import { CustomBrowserRouter } from "./router/host-router";

init({
  name: "host",
  remotes: [
    {
      name: "remote",
      type: "module",
      entry: "http://localhost:3001/remoteEntry.js",
      alias: "remote",
    },
  ],
  // Remote load 실패 처리 플러그인 추가
  plugins: [
    {
      name: "error-handler-plugin",
      errorLoadRemote({ id, error }) {
        console.error(`Failed to load remote module '${id}':`, error);
        return {
          default: () => <div>Failed to load remote module '{id}'</div>,
        };
      },
    },
    // RetryPlugin({
    //   fetch: {
    //     url: "http://localhost:3001/remoteEntry.js",
    //     retryTimes: 10,
    //     retryDelay: 5000,
    //   },
    // }),
  ],
});

// 미리 로드할 리모트 모듈 지정 플러그인
// preloadRemote([
//   {
//     nameOrAlias: "remote",
//     // 특정 리모트 모듈 미리 로드
//     depsRemote: [{ nameOrAlias: "remote/RemoteRoute" }],

//     // 모든 리모트 모듈 미리 로드
//     //resourceCategory: 'all',
//   },
// ]);

function App() {
  return <CustomBrowserRouter />;
}

export default App;
