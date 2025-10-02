import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Icon,
  useColorModeValue,
  useToast,
  VStack,
  Text,
  Divider,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  MdCreditCard,
  MdLock,
  MdMail,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AuthResponse, LoginCredentials } from "../types";
import { API_URL } from "./auth/constants";
import { useAuth } from "../Compo/auth/AuthProvider";
//import { set } from "react-hook-form";

function Login() {
  const auth = useAuth();
  const goTo = useNavigate();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  ///aqui hay que poner el de autenticacion
  // const {login, isLoading}={}
  //let success = null;

  const toast = useToast();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!credentials.email || !credentials.password) {
      setError("Por favor complete los campos");
      toast({
        title: "Campos Vacios",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (response.ok) {
        setError("");
        const json = (await response.json()) as AuthResponse;
        console.log(json);
        if (json.body.accessToken && json.body.refreshToken) {
          auth.saveUser(json);
          console.log("Login successful");
          goTo("/layout");
        }
      }
    } catch (error) {}
  }

  const handleInputChange = (field: keyof LoginCredentials, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  return (
    <>
      <Flex
        minH="100vh"
        align="center"
        justify="center"
        bg={useColorModeValue("gray.50", "gray.900")}
        px={4}
      >
        <Box maxW="md" w="full">
          <Card
            bg={bgColor}
            borderColor={borderColor}
            borderWidth="1px"
            shadow="xl"
            rounded="xl"
          >
            <CardBody p={8}>
              <VStack spacing={4}>
                <Flex align="center" gap={3}>
                  <Box bg="blue.500" p={3} rounded="lg" color="white">
                    <Icon as={MdCreditCard} boxSize={6} />
                  </Box>
                  <Box textAlign="left">
                    <Heading size="lg" color="gray.800">
                      Payment Tracker
                    </Heading>
                    <Text fontSize="sm" color="gray.500">
                      Gestión de Pagos
                    </Text>
                  </Box>
                </Flex>
                <Text color="gray.600" textAlign="center">
                  Inicia sesión para acceder a tu cuenta
                </Text>
              </VStack>

              <Divider />

              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel color="gray.700">Email</FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <Icon as={MdMail} color="gray.400"></Icon>
                      </InputLeftElement>
                      <Input
                        type="email"
                        value={credentials.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="correo@email.com"
                        bg="white"
                        borderColor="gray.300"
                        _hover={{ borderColor: "gray.400" }}
                        _focus={{
                          borderColor: "blue.500",
                          boxShadow: "0 0 0 1px #3182ce",
                        }}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color="gray.700">Contraseña</FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <Icon as={MdLock} color="gray.400" />
                      </InputLeftElement>
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={credentials.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        placeholder="Tu constraseña"
                        bg="white"
                        borderColor="gray.300"
                        _hover={{ borderColor: "gray.400" }}
                        _focus={{
                          borderColor: "blue.500",
                          boxShadow: "0 0 0 1px #3182ce",
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        position="absolute"
                        right={2}
                        top="50%"
                        transform="translateY(-50%)"
                        onClick={() => setShowPassword(!showPassword)}
                        zIndex={2}
                      >
                        <Icon
                          as={showPassword ? MdVisibilityOff : MdVisibility}
                          boxSize={4}
                        />
                      </Button>
                    </InputGroup>
                  </FormControl>

                  {error && (
                    <Alert status="error" rounded="md">
                      <AlertIcon />
                      {error}
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    w="full"
                    // isLoading={isLoading}
                    loadingText="Iniciando session..."
                    _hover={{ transform: "translateY(-1px)", shadow: "lg" }}
                    transition="all 0.2s"
                  >
                    Iniciar Sesión
                  </Button>
                </VStack>
              </form>
            </CardBody>
          </Card>
        </Box>
      </Flex>
    </>
  );
}

export default Login;
