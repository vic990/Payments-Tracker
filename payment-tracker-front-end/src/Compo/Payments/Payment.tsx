import {
  Box,
  Card,
  Heading,
  SimpleGrid,
  Center,
  Divider,
  Table,
  TableContainer,
  Thead,
  Tr,
  Td,
  useColorModeValue,
  CardHeader,
  Tbody,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { API_URL } from "../auth/constants";
import { dataResponse, PaymentDTO } from "../../types";

function Payment() {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const [ownPayment, setOwnPayment] = useState<PaymentDTO[]>([]);
  const [onBehalf, setOnBehalf] = useState<PaymentDTO[]>([]);

  const getPayments = useCallback(async () => {
    try {
      const userStored = localStorage.getItem("user");
      const id = userStored ? JSON.parse(userStored).user_id : null;
      const paymentsResponse = await fetch(`${API_URL}/paymentQuery/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });

      const json = (await paymentsResponse.json()) as dataResponse;

      setOwnPayment(json.body.data.own);
      setOnBehalf(json.body.data.onBehalf);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  }, []);

  useEffect(() => {
    getPayments();
  }, [getPayments]);

  return (
    <>
      <Box>
        <Card
          bg={bgColor}
          borderColor={borderColor}
          borderWidth="1px"
          shadow="sm"
        >
          <CardHeader>
            <Heading size="sm" textTransform={"uppercase"}>
              Mis Pagos Realizados
            </Heading>
          </CardHeader>
          <SimpleGrid minChildWidth="120px" spacing={6}>
            <TableContainer>
              <Table variant="striped" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Td>Monto</Td>
                    <Td>Notas</Td>
                  </Tr>
                </Thead>
                <Tbody>
                  {ownPayment.map((payment) => (
                    <Tr key={payment.id}>
                      <Td>{payment.amount}</Td>
                      <Td>{payment.notes}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </SimpleGrid>
        </Card>
      </Box>

      <Center height="50px">
        <Divider orientation="horizontal" />
      </Center>

      <Box>
        <Card
          bg={bgColor}
          borderColor={borderColor}
          borderWidth="1px"
          shadow="sm"
        >
          <CardHeader>
            <Heading size="sm" textTransform={"uppercase"}>
              Pagos Que He Realizado Por Otros
            </Heading>
          </CardHeader>

          <SimpleGrid minChildWidth="120px" spacing={6}>
            <TableContainer>
              <Table variant="striped" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Td>Nombre</Td>
                    <Td>Monto</Td>
                    <Td>Notas</Td>
                  </Tr>
                </Thead>

                <Tbody>
                  {onBehalf.map((payment) => (
                    <Tr key={payment.id}>
                      <Td>{payment.name}</Td>
                      <Td>{payment.amount}</Td>
                      <Td>{payment.notes}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </SimpleGrid>
        </Card>
      </Box>
    </>
  );
}

export default Payment;
