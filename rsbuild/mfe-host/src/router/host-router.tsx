import { HostHome } from "../componentes";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
  useRouteError,
} from "react-router";
import { RemoteApp } from "../componentes/remote-app";

const localRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HostHome />,
  },
  {
    path: "/remote/*",
    element: <RemoteApp />,
  },
];

const browserRouter = createBrowserRouter([
  {
    errorElement: <BubbleError />,
    HydrateFallback: LayoutSkeleton,
    children: [...localRoutes],
  },
]);

export function CustomBrowserRouter() {
  return <RouterProvider router={browserRouter} />;
}

function BubbleError() {
  const error = useRouteError();

  if (error) throw error;
  return null;
}

function LayoutSkeleton() {
  return <div>...Loading</div>;
}
