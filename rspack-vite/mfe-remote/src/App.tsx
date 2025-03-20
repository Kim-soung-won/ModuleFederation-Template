import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import RemoteRoutes from "./export/remote-routes";

const routes = RemoteRoutes();

const CustomRoute = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={CustomRoute} />;
}

export default App;
