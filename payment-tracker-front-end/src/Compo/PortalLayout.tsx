import { ReactNode } from "react";
import { useAuth } from "./auth/AuthProvider";
import Header from "../Compo/Layout/Header";
import Sidebar from "./Layout/Sidebar";

type portalProps = {
  children: ReactNode;
};

function PortalLayout({ children }: portalProps) {
  const auth = useAuth();

  return (
    <>
      <main className="Layout"> {children}</main>
    </>
  );
}
export default PortalLayout;
