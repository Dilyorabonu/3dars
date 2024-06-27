import { createBrowserRouter, RouterProvider } from "react-router-dom";

//pages
import { Home, Login, Register } from "./pages";

//layout
import MainLayout from "./layouts/MainLayout";

import { loader as LoginLoader } from "./pages/Login";
import { loader as RegisterLoader } from "./pages/Register";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
      loader: LoginLoader,
    },
    {
      path: "/register",
      element: <Register />,
      loader: RegisterLoader,
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
