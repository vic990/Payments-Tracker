import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";

function ProtecteRoute() {
  const isAuth = useAuth();
  return isAuth ? <Outlet></Outlet> : <Navigate to="/" />;
}

export default ProtecteRoute;
