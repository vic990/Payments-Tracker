import React from "react";
import { Box, VStack, Button, Icon, useColorModeValue } from "@chakra-ui/react";
import {
  MdHome,
  MdCreditCard,
  MdPeople,
  MdBarChart,
  MdHistory,
  MdAdd,
} from "react-icons/md";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const bgcolor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const menuItems = [
    { id: "dashboard", icon: MdHome, label: "Dashboard" },
    { id: "new-payment", icon: MdAdd, label: "Nuevo Pago" },
    { id: "payments", icon: MdCreditCard, label: "Pagos" },
    { id: "users", icon: MdPeople, label: "Usuarios" },
    { id: "reports", icon: MdBarChart, label: "Reportes" },
    { id: "history", icon: MdHistory, label: "Historial" },
  ];

  return (
    <Box
      w={64}
      bg={bgcolor}
      borderRightWidth="1px"
      borderColor={borderColor}
      h="calc(100vh - 64px)"
      shadow="sm"
    >
      <VStack spacing={2} p={4} mt={8}>
        {menuItems.map((item) => (
          <Button
            key={item.id}
            w="full"
            justifyContent="flex-start"
            leftIcon={<Icon as={item.icon} />}
            variant={activeTab === item.id ? "solid" : "ghost"}
            colorScheme={activeTab === item.id ? "blue" : "gray"}
            onClick={() => onTabChange(item.id)}
            size="md"
            fontWeight="medium"
            _hover={{
              bg: activeTab === item.id ? "blue.600" : "gray.100",
            }}
          >
            {item.label}
          </Button>
        ))}
      </VStack>
    </Box>
  );
}

export default Sidebar;
