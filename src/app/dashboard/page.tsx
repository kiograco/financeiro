"use client";
import { useState, useEffect, ChangeEvent, ReactNode } from "react";
import { Box, Heading, HStack, Stack, VStack } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";
import Filters from "../../components/Filters";
import { useFilters } from "@/hooks/useFilters";
import { ITransaction } from "@/types/Transaction";
import Cards from "@/components/Cards";
import StackedBarChart from "@/components/StackedBarChart";
import LineChart from "@/components/LineChart";

const DashboardPage = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await fetch("/transactions.json");
      const data: ITransaction[] = await res.json();
      setTransactions(data);
    };
    fetchTransactions();
  }, []);

  const { handleFilterChange, filteredTransactions } = useFilters(transactions);

  // Função para limpar os filtros
  const clearFilters = () => {
    handleFilterChange({
      target: {
        name: "account",
        value: "",
      },
    } as ChangeEvent<HTMLInputElement>);
    handleFilterChange({
      target: {
        name: "industry",
        value: "",
      },
    } as ChangeEvent<HTMLInputElement>);
    handleFilterChange({
      target: {
        name: "state",
        value: "",
      },
    } as ChangeEvent<HTMLInputElement>);
    handleFilterChange({
      target: {
        name: "startDate",
        value: "",
      },
    } as ChangeEvent<HTMLInputElement>);
    handleFilterChange({
      target: {
        name: "endDate",
        value: "",
      },
    } as ChangeEvent<HTMLInputElement>);
  };

  const CardBox = ({ children }: { children: ReactNode }) => {
    return (
      <Box
        p={5}
        width={"100%"}
        height={"300px"}
        shadow="md"
        borderWidth="1px"
        borderRadius="md"
      >
        {children}
      </Box>
    );
  };

  return (
    <Box display="flex" maxH={"80vh"}>
      <Sidebar />
      <Box
        mt="80px"
        p={5}
        width={"100vw"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={8}
      >
        <Heading mb={8}>Dashboard Financeiro</Heading>
        <Stack direction={"row"}>
          <Filters
            transactions={transactions}
            handleFilterChange={handleFilterChange}
            clearFilters={clearFilters} // Passa a função de limpar filtros
          />
          <VStack align={"start"} width={"100%"}>
            <Cards transactions={transactions} />
            <HStack spacing={8} width={"100%"} height={"100%"}>
              <CardBox>
                <StackedBarChart transactions={filteredTransactions} />
              </CardBox>
              <CardBox>
                <LineChart transactions={filteredTransactions} />
              </CardBox>
            </HStack>
          </VStack>
        </Stack>
      </Box>
    </Box>
  );
};

export default DashboardPage;
