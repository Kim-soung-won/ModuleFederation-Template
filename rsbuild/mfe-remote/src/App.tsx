import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Routes,
} from "react-router";
import "./App.css";
import RemoteRoutes from "./export/remote-routes";

const routes = RemoteRoutes({ label: "Example Label" });

const CustomRoute = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={CustomRoute} />;
}

export default App;
