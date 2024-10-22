"use client";
import { Box, HStack, Button } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext"; // Ajuste o caminho se necessário
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <Box
      as="nav"
      bg="gray.800"
      color="white"
      w="100vw"
      p={5}
      position="fixed"
      zIndex={"9999"}
    >
      <HStack 
      justifyContent={"center"}
      align="center" spacing={6}>
        <Button variant="link" color="white" onClick={() => router.push("/dashboard")}>
          Home
        </Button>
        <Button variant="link" color="white" onClick={handleLogout}>
          Logout
        </Button>
      </HStack>
    </Box>
  );
};

export default Sidebar;