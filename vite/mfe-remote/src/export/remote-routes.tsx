import { Green, Yellow } from "../componentes";
import { RouteObject } from "react-router";

export default function RemoteRoutes(): RouteObject[] {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <Yellow />,
    },
    {
      path: "/yellow",
      element: <Yellow />,
    },
    {
      path: "/green",
      element: <Green />,
    },
  ];
  return routes;
}
