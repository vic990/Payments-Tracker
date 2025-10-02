import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Icon,
  Badge,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import {
  MdCreditCard,
  MdNotifications,
  MdSettings,
  MdLogout,
  MdPerson,
} from "react-icons/md";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { User } from "../../types";

type Props = {
  user?: User;
};

function Header() {
  const auth = useAuth();
  const goTo = useNavigate();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  function handleSignOut(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      //   auth.signOut();
      goTo("/");
    } catch (error) {}
  }
  return (
    <>
      <Box
        bg={bgColor}
        borderBottomWidth="1px"
        borderColor={borderColor}
        shadow="sm"
      >
        <Flex
          maxW="7x1"
          mx="auto"
          px={{ base: 4, sm: 6, lg: 8 }}
          h={16}
          align="center"
          justify="space-between"
        >
          <HStack spacing={3} m={0}>
            <Box bg="blue.500" p={2} rounded="lg">
              <Icon as={MdCreditCard} boxSize={6} color="white" />
            </Box>
            <Box>
              <Heading fontSize="lg" color="gray.900">
                Payment Tracker
              </Heading>
              <Text fontSize="xs" color="gray.500">
                Gestión de Pagos
              </Text>
            </Box>
          </HStack>

          <HStack spacing={4}>
            <Button
              variant="ghost"
              size="sm"
              position="relative"
              color="gray.400"
              _hover={{ color: "gray.600" }}
            >
              <Icon as={MdNotifications} boxSize={5} />
              <Badge
                position="absolute"
                top={1}
                right={1}
                colorScheme="red"
                rounded="full"
                boxSize={2}
              />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              color="gray.400"
              _hover={{ color: "gray.600" }}
            >
              <Icon as={MdSettings} boxSize={5} />
            </Button>

            <Box h={6} w="1px" bg="gray.200" />

            <Menu>
              <MenuButton>
                <HStack spacing={2}>
                  <Avatar size="sm" name={auth.getUser()?.user_name} />
                  <Box textAlign="left" display={{ base: "none", sm: "block" }}>
                    <Text fontSize="sm" fontWeight="medium" color="gray.900">
                      {auth.getUser()?.user_name}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {/* {user?.role === 'admin' ? 'Administrador' : 'Usuario'} */}
                    </Text>
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem icon={<Icon as={MdPerson} />}>Mi Perfil</MenuItem>
                <MenuItem icon={<Icon as={MdSettings} />}>
                  Configuración
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  icon={<Icon as={MdLogout} />}
                  onClick={handleSignOut}
                  color="red.500"
                >
                  Cerrar Sesión
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </Box>
    </>
  );
}

export default Header;
