import packageJson from "../package.json";

interface SharedObject {
  [sharedName: string]: SharedConfig | string;
}

/**
 * singleton: 해당 라이브러리 버전을 하나로 통일할지 Default: false
 * requiredVersion: 해당 서비스에서 요구하는 라이브러리 버전
 * eager: 해당 라이브러리를 미리 로드할지 Default: false
 * shareScope: 해당 라이브러리를 어느 범위에서 공유할지
 * 출처: https://module-federation.io/configure/shared.html
 */
interface SharedConfig {
  singleton?: boolean;
  requiredVersion?: string;
  eager?: boolean;
  shareScope?: string;
}

export const getFederationShared = (): SharedObject => {
  const deps = packageJson.dependencies;
  return {
    ...deps,
    react: { singleton: true, requiredVersion: deps.react },
    "react-dom": {
      singleton: true,
      requiredVersion: deps["react-dom"],
    },
    "react-router": { singleton: true, requiredVersion: deps["react-router"] },
  };
};
