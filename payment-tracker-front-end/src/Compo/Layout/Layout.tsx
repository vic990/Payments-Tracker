import { ReactNode, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "../Dashboard/Dashboard";
import { Flex, Box } from "@chakra-ui/react";

type Props = { children?: ReactNode };

function Layout() {
  const auth = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  return (
    <>
      <Flex direction="column" minH="100vh">
        <Header />
        <Flex flex="1" direction="row">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <Box flex="1" p={4}>
            <Dashboard />
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export default Layout;
