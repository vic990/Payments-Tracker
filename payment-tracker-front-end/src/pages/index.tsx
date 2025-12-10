import { createBrowserRouter } from "react-router-dom";
import Login from "../Compo/Login";
import ProtectedRoute from "../Compo/ProtectedRoute";
import Layout from "../Compo/Layout/Layout";

const router = createBrowserRouter([
  {
    index: true,
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/layout",
        children: [
          {
            index: true,
            element: <Layout />,
          },
        ],
      },
    ],
  },
]);

export default router;
