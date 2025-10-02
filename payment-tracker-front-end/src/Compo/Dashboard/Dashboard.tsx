import { useAuth } from "../auth/AuthProvider";
import PortalLayout from "../PortalLayout";

function Dashboard() {
  const auth = useAuth();
  return (
    <>
      <div>Dashboard</div>
    </>
  );
}

export default Dashboard;
