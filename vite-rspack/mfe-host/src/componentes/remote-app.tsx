import { lazy, Suspense, useEffect, useState } from "react";
import { Route, RouteObject, Routes } from "react-router";

export function RemoteApp(): React.ReactNode {
  const [remoteRoutes, setRemoteRoutes] = useState<RouteObject[] | null>(null);

  useEffect(() => {
    // Remote에서 라우트 정보를 가져옴
    import("remote/RemoteRoute")
      .then((module) => {
        const routes = module.default({ label: "Remote" });
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
