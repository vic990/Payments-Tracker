import React from "react";
import { Box, Heading, Text, SimpleGrid, VStack } from "@chakra-ui/react";
import {
  MdCreditCard,
  MdTrendingUp,
  MdPeople,
  MdAttachMoney,
} from "react-icons/md";
import StatsCard from "./StatsCards";
import RecentPayments from "./RecentPayments";
import PaymentChart from "./PaymentChart";
import { useAuth } from "../auth/AuthProvider";

function Dashboard() {
  // const auth = useAuth();
  return (
    <VStack spacing="xl" align="stretch">
      <Box>
        <Heading size="xl" color="gray.900">
          Dashboard
        </Heading>
        <Text color="gray.600" mt={1}>
          Resumen de gastos y pagos
        </Text>
      </Box>

      {/* Stats Cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        <StatsCard
          title="Total Gastado"
          value="$830.75"
          change="+12% vs mes anterior"
          changeType="increase"
          icon={MdAttachMoney}
          color="blue"
        />

        <StatsCard
          title="Pagos completados"
          value="24"
          change="+8% vs mes anterior"
          changeType="increase"
          icon={MdCreditCard}
          color="green"
        />
        <StatsCard
          title="Usuarios Activos"
          value="5"
          change="Sin cambios"
          changeType="neutral"
          icon={MdPeople}
          color="purple"
        />
        <StatsCard
          title="Promedio por Gasto"
          value="$166.15"
          change="+5% vs mes anterior"
          changeType="increase"
          icon={MdTrendingUp}
          color="orange"
        />
      </SimpleGrid>
      {/* Chart and Recent Payments + User Summary */}
      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6}>
        <Box gridColumn={{ lg: "span 2" }}>
          <PaymentChart />
        </Box>
        <VStack spacing={6}>
          <RecentPayments />
          {/* <UserExpenseSummary /> */}
        </VStack>
      </SimpleGrid>
    </VStack>
  );
}

export default Dashboard;
