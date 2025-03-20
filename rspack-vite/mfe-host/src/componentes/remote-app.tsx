import { loadRemote } from "@module-federation/enhanced/runtime";
import { Suspense, useEffect, useState } from "react";
import { Route, RouteObject, Routes } from "react-router";
import RemoteRoute from "remote/RemoteRoute";

export function RemoteApp(): React.ReactNode {
  const [remoteRoutes, setRemoteRoutes] = useState<RouteObject[] | null>(null);

  useEffect(() => {
    // Remote에서 라우트 정보를 가져옴
    loadRemote<{ default: typeof RemoteRoute }>("remote/RemoteRoute", {
      from: "runtime",
    })
      .then((module) => {
        const routes = module.default;
        setRemoteRoutes(routes);
      })
      .catch((error) => {
        console.error("Failed to load remote routes:", error);
      });
  }, []);

  if (!remoteRoutes) {
    // 로딩 중일 때 보여줄 Fallback 컴포넌트
    return <div>Loading remote routes...</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {remoteRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Suspense>
  );
}
