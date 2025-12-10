import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  HStack,
  Text,
  Alert,
  AlertIcon,
  Card,
  CardBody,
  Heading,
  Icon,
  InputGroup,
  InputLeftElement,
  useToast,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { jsonResponse, PaymentFormData, User } from "../../types";
import {
  MdAttachMoney,
  MdPerson,
  MdMessage,
  MdPersonAdd,
} from "react-icons/md";
import { useCallback, useEffect, useState } from "react";
import { API_URL } from "../auth/constants";

const empytFormData: PaymentFormData = {
  amount: 0,
  ownerId: "",
  payerId: "",
  notes: "",
};

interface paymentResponse {
  body: {
    success: boolean;
    message: string;
  };
}

function NewPaymentForm() {
  const [formData, setFormData] = useState<PaymentFormData>(empytFormData);
  const [userList, setUserList] = useState<User[]>([]);

  const [errors, setErrors] = useState<Partial<PaymentFormData>>({});
  const toast = useToast();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: Partial<PaymentFormData> = {};
    if (formData.amount <= 0) newErrors.amount = 0;
    if (!formData.ownerId) newErrors.ownerId = "";
    if (!formData.payerId) newErrors.payerId = "";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    //aqui se envian los datos al back end
    try {
      const response = await fetch(`${API_URL}/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: formData.amount,
          paid_by_user_id: parseInt(formData.payerId),
          paid_on_behalf_of_user_id: parseInt(formData.ownerId),
          notes: formData.notes,
        }),
      });
      const json = (await response.json()) as paymentResponse;

      if (response.ok) {
        setErrors({});
        setFormData(empytFormData);

        toast({
          title: "Pago Registrado",
          description: json.body.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: json.body.message || "Error al procesar el pago",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      toast({
        title: "Error de conexión",
        description: "No se pudo conectar con el servidor",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    //console.log("Datos del pago: ", formData);
  }

  const getUsers = useCallback(async () => {
    try {
      const listResponse = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const jsonList = (await listResponse.json()) as jsonResponse<User[]>;
      if (listResponse.ok) {
        setUserList(jsonList.body.data || []);
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      toast({
        title: "Error de conexión",
        description: "No se pudo obtener lista de usuarios",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleInputChange = (
    field: keyof PaymentFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const selectedOwner = userList.find(
    (user) => user.user_id === parseInt(formData.ownerId)
  );
  const selectedPayer = userList.find(
    (user) => user.user_id === parseInt(formData.payerId)
  );
  const isSelfPayment =
    formData.ownerId === formData.payerId && formData.ownerId;

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
            <Box>
              <Heading size="xl" color="gray.900">
                Registrar Pago
              </Heading>
              <Text color="gray.600" mt={2}>
                Complete los detalles del pago y especifique quién lo paga
              </Text>
            </Box>
            <form onSubmit={handleSubmit}>
              <VStack spacing={6} align="stretch">
                <FormControl isRequired isInvalid={errors.amount !== undefined}>
                  <FormLabel>
                    <HStack>
                      <Icon as={MdAttachMoney} boxSize={4} />
                      <Text>Monto del Pago</Text>
                    </HStack>
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <Text color="gray.500">$</Text>
                    </InputLeftElement>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.amount || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "amount",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      placeholder="0.00"
                      pl={8}
                    />
                  </InputGroup>
                  {errors.amount !== undefined && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      El monto debe ser mayor a 0
                    </Text>
                  )}
                </FormControl>

                {/*Propietario del gasto y quien paga */}
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <FormControl
                    isRequired
                    isInvalid={errors.ownerId !== undefined}
                  >
                    <FormLabel>
                      <HStack>
                        <Icon as={MdPerson} boxSize={4} />
                        <Text>Propietarios del Gasto (Paga en vez de:)</Text>
                      </HStack>
                    </FormLabel>
                    <Select
                      value={formData.ownerId}
                      onChange={(e) =>
                        handleInputChange("ownerId", e.target.value)
                      }
                      placeholder="A quien le corresponde?"
                    >
                      {userList.map((user) => (
                        <option key={user.user_id} value={user.user_id}>
                          {user.user_name} {user.user_lastname}
                        </option>
                      ))}
                    </Select>
                    {errors.ownerId !== undefined && (
                      <Text color="red.500" fontSize="sm" mt={1}>
                        Seleccione el propietario del gasto
                      </Text>
                    )}
                  </FormControl>
                  <FormControl
                    isRequired
                    isInvalid={errors.payerId !== undefined}
                  >
                    <FormLabel>
                      <HStack>
                        <Icon as={MdPersonAdd} boxSize={4} />
                        <Text> Quien Paga</Text>
                      </HStack>
                    </FormLabel>

                    <Select
                      value={formData.payerId}
                      onChange={(e) =>
                        handleInputChange("payerId", e.target.value)
                      }
                      placeholder="¿Quién lo paga?"
                    >
                      {userList.map((user) => (
                        <option key={user.user_id} value={user.user_id}>
                          {user.user_name} {user.user_lastname}
                        </option>
                      ))}
                    </Select>
                    {errors.ownerId !== undefined && (
                      <Text color="red.500" fontSize="sm" mt={1}>
                        Seleccione quien paga
                      </Text>
                    )}
                  </FormControl>
                </SimpleGrid>

                {/*Indicador visual del tipo de pago */}
                {selectedOwner && selectedPayer && (
                  <Alert
                    status={isSelfPayment ? "success" : "info"}
                    variant="left-accent"
                    rounded="lg"
                  >
                    <AlertIcon />
                    {isSelfPayment ? (
                      <Text>
                        <strong>Pago propio: </strong>
                        {selectedOwner.user_name} paga por si mismo
                      </Text>
                    ) : (
                      <Text>
                        <strong>Pago por otro: </strong>
                        {selectedPayer.user_name} paga por{" "}
                        {selectedOwner.user_name}
                      </Text>
                    )}
                  </Alert>
                )}

                {/* Notas */}
                <FormControl>
                  <FormLabel>
                    <HStack>
                      <Icon as={MdMessage} boxSize={4} />
                      <Text>Notas (Opcional)</Text>
                    </HStack>
                  </FormLabel>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    rows={3}
                    placeholder="Información adicional sobre el gasto..."
                  />
                </FormControl>

                {/* Botones */}
                <HStack spacing={4} pt={6}>
                  <Button type="submit" colorScheme="blue" size="lg" flex={1}>
                    Registrar Pago
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    flex={1}
                    onClick={() => {
                      setFormData(empytFormData);
                      setErrors({});
                    }}
                  >
                    Limpiar Formulario
                  </Button>
                </HStack>
              </VStack>
            </form>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
}

export default NewPaymentForm;
