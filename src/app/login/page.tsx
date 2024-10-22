"use client";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const toast = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "user" && password === "password") {
      login(); 
      router.push("/dashboard"); // Redireciona para o dashboard após login
    } else {
      toast({
        title: "Falha no login.",
        description: "Nome de usuário ou senha incorretos.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5}>
      <Heading mb={4}>Login</Heading>
      <FormControl id="username" mb={4}>
        <FormLabel>Nome de Usuário</FormLabel>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Digite seu nome de usuário"
        />
      </FormControl>
      <FormControl id="password" mb={4}>
        <FormLabel>Senha</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
        />
      </FormControl>
      <Button colorScheme="teal" onClick={handleLogin}>
        Fazer Login
      </Button>
    </Box>
  );
};

export default LoginPage;