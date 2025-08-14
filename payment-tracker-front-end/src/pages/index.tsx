import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../components/Dashboard";

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
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
