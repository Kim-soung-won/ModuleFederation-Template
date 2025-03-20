// Layout 에서 사용할 원격 모듈 리스트 정의
import { Modules } from "./modules";

/**
 * remotes 설정 타입
 * type: 모듈의 타입을 의미하며 vite 모듈의 경우 "module"로 설정한다.
 * name: Unique 해야하며 각 모듈의 이름을 갖는다. import 경로의 머릿말을 담당한다. ex) import({name}/{component name})
 * entry: 원격 모듈의 주소값으로 내보낸 파일의 경로를 명시한다. 기본값인 remoteEntry.js 외에는 불러오지 못하는 것 같다.
 */
type remote = {
  type: string;
  name: string;
  entry: string;
};

export const getFederationRemoteForTypescriptLib = () => {
  const remotes: Record<string, string> = {};

  const list = Modules;

  Object.entries(list).forEach(([key, value]) => {
    remotes[key] = value.url;
  });
  return remotes;
};

export const getFederationRemoteForRemoteEntry = () => {
  const remotes: Record<string, remote> = {};

  const list = Modules;

  Object.entries(list).forEach(([key, value]) => {
    remotes[key] = {
      type: "module",
      name: key,
      entry: value.url,
    };
  });
  return remotes;
};
