import {
  Box,
  Text,
  VStack,
  HStack,
  Avatar,
  Icon,
  Button,
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
// import { useAuth } from "../auth/AuthProvider";

function RecentPayments() {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const recentPayments = mockPayments.slice(0, 5);
  // const auth = useAuth();

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

  //this should return the list of payments with the users
  const getUserName = (userId: string) => {
    return mockUsers.find((user) => user.id === userId)?.name || "Usuario";
  };
  const getUserAvatar = (userId: string) => {
    return mockUsers.find((user) => user.id === userId)?.avatar;
  };

  return (
    <Card
      bg={bgColor}
      borderColor={borderColor}
      borderWidth="1px"
      shadow="sm"
      w="full"
    >
      <CardHeader>
        <Text fontSize="lg" fontWeight="semibold" color="gray.900">
          Pagos Recientes
        </Text>
      </CardHeader>

      <CardBody pt={0}>
        <VStack spacing={4} divider={<Divider />}>
          {recentPayments.map((payment) => {
            const isSelfPayment = payment.ownerId === payment.payerId;
            const ownerAvatar = getUserAvatar(payment.ownerId);
            const payerAvatar = getUserAvatar(payment.payerId);

            return (
              <HStack key={payment.id} w="full" justify="space-between" py={3}>
                <HStack spacing={3}>
                  <Box position="relative">
                    <Avatar
                      size="sm"
                      src={ownerAvatar}
                      name={getUserName(payment.ownerId)}
                    />
                    {!isSelfPayment && (
                      <Avatar
                        size="xs"
                        src={payerAvatar}
                        name={getUserName(payment.payerId)}
                        position="absolute"
                        top={-1}
                        right={-1}
                        border="2px solid white"
                      />
                    )}
                  </Box>
                  <Box minW={0} flex={1}>
                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      color="gray.900"
                      noOfLines={1}
                    >
                      {payment.concept}
                    </Text>
                    <HStack spacing={1} fontSize="xs" color="gray.500">
                      {isSelfPayment ? (
                        <>
                          <Icon as={MdPerson} boxSize={3} />
                          <Text>{getUserName(payment.ownerId)}</Text>
                        </>
                      ) : (
                        <>
                          <Icon as={MdPersonAdd} boxSize={3} />
                          <Text>
                            {getUserName(payment.payerId)} →{" "}
                            {getUserName(payment.ownerId)}
                          </Text>
                        </>
                      )}
                    </HStack>
                  </Box>
                  {getStatusIcon(payment.status)}
                </HStack>
                <Box textAlign="right">
                  <Text fontSize="sm" fontWeight="semibold" color="gray.900">
                    ${payment.amount.toFixed(2)}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {new Date(payment.date).toLocaleDateString()}
                  </Text>
                </Box>
              </HStack>
            );
          })}
        </VStack>
        <Button
          w="full"
          mt={4}
          variant="ghost"
          colorScheme="blue"
          size="sm"
        ></Button>
      </CardBody>
    </Card>
  );
}

export default RecentPayments;
