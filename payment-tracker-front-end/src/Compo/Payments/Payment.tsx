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
} from "@chakra-ui/react";

function Payment() {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

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
              <Table variant="striped" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Td>Monto</Td>
                    <Td>Notas</Td>
                  </Tr>
                </Thead>
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
              <Table variant="striped" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Td>Nombre</Td>
                    <Td>Monto</Td>
                    <Td>Notas</Td>
                  </Tr>
                </Thead>
              </Table>
            </TableContainer>
          </SimpleGrid>
        </Card>
      </Box>
    </>
  );
}

export default Payment;
