import {
  Box,
  Text,
  Flex,
  Icon,
  VStack,
  HStack,
  useColorModeValue,
  Card,
  CardBody,
  CardHeader,
} from "@chakra-ui/react";
import { MdBarChart } from "react-icons/md";

function PaymentChart() {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const chartData = [
    { month: "Ene", amount: 650 },
    { month: "Feb", amount: 890 },
    { month: "Mar", amount: 420 },
    { month: "Abr", amount: 1200 },
    { month: "May", amount: 830 },
    { month: "Jun", amount: 950 },
  ];

  const maxAmount = Math.max(...chartData.map((item) => item.amount));

  return (
    <Card bg={bgColor} borderColor={borderColor} borderWidth="1px" shadow="sm">
      <CardHeader>
        <Flex justify="space-between" align="center">
          <Box>
            <Text fontSize="lg" fontWeight="semibold" color="gray.900">
              Tendencia de pagos
            </Text>
            <Text fontSize="sm" color="gray.600">
              Ultimos 6 meses
            </Text>
          </Box>
          <Icon as={MdBarChart} boxSize={5} color="gray.400" />
        </Flex>
      </CardHeader>

      <CardBody pt={0}>
        <VStack spacing={4}>
          {chartData.map((item, index) => {
            const percentage = (item.amount / maxAmount) * 100;
            return (
              <HStack key={index} w="full" spacing={4}>
                <Text w={8} fontSize="sm" fontWeight="medium" color="gray.600">
                  {item.month}
                </Text>
                <Box
                  flex={1}
                  bg="gray.200"
                  rounded="full"
                  h={3}
                  position="relative"
                >
                  <Box
                    bg="linear-gradient(90deg, #3182ce, #2b77cb)"
                    h={3}
                    rounded="full"
                    transition="all 0.5s ease-out"
                    w={`${percentage}%`}
                  />
                </Box>
                <Text
                  w={16}
                  fontSize="sm"
                  fontWeight="semibold"
                  color="gray.900"
                  textAlign="right"
                >
                  ${item.amount}
                </Text>
              </HStack>
            );
          })}
        </VStack>
      </CardBody>
    </Card>
  );
}

export default PaymentChart;
