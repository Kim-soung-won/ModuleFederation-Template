import proxyJson from "./proxy.conf.json";

type ProxyConfig = Record<
  string,
  {
    target: string;
    changeOrigin: boolean;
    secure?: boolean;
    rewrite: (pathUrl: string) => string;
  }
>;

/**
 * proxy 설정 로드
 * @returns ProxyConfig
 */
export const loadProxyConfig = () => {
  try {
    const proxyConfigJson = proxyJson;

    const proxyConfig = Object.entries(proxyConfigJson).reduce<ProxyConfig>(
      (acc, [key, value]) => {
        acc[key] = {
          target: value.target,
          changeOrigin: value.changeOrigin,
          secure: value.secure,
          rewrite: (pathUrl: string) =>
            pathUrl.replace(new RegExp(value.pathRewrite), ""),
        };
        return acc;
      },
      {},
    );

    return proxyConfig;
  } catch (error) {
    console.error("Failed to load proxy.json:", error);
    return {};
  }
};
