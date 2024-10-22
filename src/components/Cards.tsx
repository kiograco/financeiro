import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
  } from "chart.js";
  import { ITransaction } from "@/types/Transaction";
  import { SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react";
  import { useFilters } from "@/hooks/useFilters";
  import { formatAmount } from "@/utils/formatAmount";
  
  ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);
  
  interface LineChartProps {
    transactions: ITransaction[];
  }
  
  const Card = ({ label, number, helperText }: { label: string; number: number; helperText: string; }) => {
    return (
      <Stat p={5} shadow="md" borderWidth="1px" borderRadius="md" w={"auto"}>
        <StatLabel>{label}</StatLabel>
        <StatNumber>R$ {number.toLocaleString("pt-BR")}</StatNumber>
        <StatHelpText>{helperText}</StatHelpText>
      </Stat>
    );
  };
  
  const Cards = ({ transactions }: LineChartProps) => {
    const { filteredTransactions } = useFilters(transactions);
  
    const calculateTotals = (transactions: ITransaction[]) => {
      const income = transactions
        .filter(t => t.transaction_type === "deposit")
        .reduce((sum, t) => sum + formatAmount(t.amount), 0);
  
      const expenses = transactions
        .filter(t => t.transaction_type === "withdraw")
        .reduce((sum, t) => sum + formatAmount(t.amount), 0);
  
      const balance = income - expenses;
      const pendingTransactions = transactions.filter(t => !t.currency).length;
  
      return { income, expenses, balance, pendingTransactions };
    };
  
    const { income, expenses, balance, pendingTransactions } = calculateTotals(filteredTransactions);
  
    return (
      <SimpleGrid columns={[2, null, 4]} spacing={6} mb={8} w={"100%"}>
        <Card label="Receitas" number={income} helperText="Total de entradas" />
        <Card label="Despesas" number={expenses} helperText="Total de saídas" />
        <Card label="Transações Pendentes" number={pendingTransactions} helperText="Sem informação de moeda" />
        <Card label="Saldo Total" number={balance} helperText="Saldo atual" />
      </SimpleGrid>
    );
  };
  
  export default Cards;  