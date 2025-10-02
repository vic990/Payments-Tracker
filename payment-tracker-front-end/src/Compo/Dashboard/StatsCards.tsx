import {
  Box,
  Text,
  Flex,
  Icon,
  useColorModeValue,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { IconType } from "react-icons";

type StatsCardProps = {
  title: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease" | "neutral";
  icon: IconType;
  color: string;
};

function StatsCard({
  title,
  value,
  change,
  changeType,
  icon: IconComponent,
  color,
}: StatsCardProps) {
  const bgColor = useColorModeValue("White", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const changeColors = {
    increase: "green.500",
    decrease: "red.500",
    neutral: "gray.500",
  };

  return (
    <Card
      bg={bgColor}
      borderColor={borderColor}
      borderWidth="1px"
      shadow="sm"
      _hover={{ shadow: "md" }}
      transition="all 0.2s"
    >
      <CardBody p={6}>
        <Flex justify="space-between" align="center">
          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.600">
              {title}
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color="gray.900" mt={1}>
              {value}
            </Text>
            <Text fontSize="sm" color={changeColors[changeType]} mt={1}>
              {change}
            </Text>
          </Box>

          <Box bg={`${color}.500`} p={3} rounded="lg">
            <Icon as={IconComponent} boxSize={6} color="white" />
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
}

export default StatsCard;
