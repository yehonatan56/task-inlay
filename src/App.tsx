import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home/home.tsx";
import Admin from "./components/admin/admin.tsx";
import User from "./components/user/user.tsx";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
    {
      path: "/user",
      element: <User />,
    },
  ]);
  return <RouterProvider router={routes} />;
}
