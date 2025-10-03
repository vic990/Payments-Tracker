import React from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Avatar,
  Icon,
  useColorModeValue,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from "@chakra-ui/react";
import { mockPayments, mockUsers } from "../../data/mockData";
import {
  MdCheckCircle,
  MdSchedule,
  MdError,
  MdPerson,
  MdPersonAdd,
} from "react-icons/md";

function RecentPayments() {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const recentPayments = mockPayments.slice(0, 5);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Icon as={MdCheckCircle} boxSize={4} color="green.500" />;
      case "pending":
        return <Icon as={MdSchedule} boxSize={4} color="yellow.500" />;
      case "failed":
        return <Icon as={MdError} boxSize={4} color="red.500" />;

      default:
        return <Icon as={MdSchedule} boxSize={4} color="gray.500" />;
    }
  };

  return <></>;
}

export default RecentPayments;
