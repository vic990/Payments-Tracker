import { ReactNode, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "../Dashboard/Dashboard";
import { Flex, Box } from "@chakra-ui/react";
import NewPaymentForm from "../Payments/NewPaymentsForm";

type Props = { children?: ReactNode };

function Layout() {
  const auth = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "new-payment":
        return <NewPaymentForm />;
      default:
        return <Dashboard />;
    }
  };
  return (
    <>
      <Flex direction="column" minH="100vh">
        <Header />
        <Flex flex="1" direction="row">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <Box flex="1" p={4}>
            {renderContent()}
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export default Layout;
