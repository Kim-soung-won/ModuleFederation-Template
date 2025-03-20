// MFE (Micro Frontend) Modules
// 전체 모듈 목록 관리

/**
 *  Import 경로는 {name}/{comp.name} 으로 구성된다. 동적으로 설정 안됨
 * name : Module의 이름
 * url : Module을 불러올 URL
 * comp : 해당 Module이 내보내는 Component List
 *  name : Component의 이름
 *  filePath : Component의 파일 경로
 */
type Module = {
  name: string;
  url: string;
  comp: Record<
    string,
    {
      name: string;
      filePath: string;
    }
  >;
};

export const Modules: Record<string, Module> = {
  host: {
    name: "host",
    url: "http://localhost:3000/remoteEntry.js",
    comp: {
      Session: {
        name: "Session",
        filePath: "session.ts",
      },
    },
  },
  remote: {
    name: "remote",
    url: "http://localhost:3001/mf-manifest.json",
    comp: {
      RemoteRoute: {
        name: "RemoteRoute",
        filePath: "remote-routes.tsx",
      },
    },
  },
};
