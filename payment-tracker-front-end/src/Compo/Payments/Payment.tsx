import {
  Box,
  Card,
  CardBody,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

function Payment() {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box>
      <Card
        bg={bgColor}
        borderColor={borderColor}
        borderWidth="1px"
        shadow="sm"
      >
        <CardBody p={8}>
          <VStack spacing={8} align="stretch">
            <Box></Box>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
}

export default Payment;
