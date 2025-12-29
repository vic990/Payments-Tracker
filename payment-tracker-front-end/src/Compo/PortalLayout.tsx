import { ReactNode } from "react";

type portalProps = {
  children: ReactNode;
};

function PortalLayout({ children }: portalProps) {
  return (
    <>
      <main className="Layout"> {children}</main>
    </>
  );
}
export default PortalLayout;
