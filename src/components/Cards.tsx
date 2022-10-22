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
import {
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
import { useFilters } from "@/hooks/useFilters";
import { formatAmount } from "@/utils/formatAmount";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

interface LineChartProps {
  transactions: ITransaction[];
}

const Card = ({
  label,
  number,
  helperText,
}: {
  label: string;
  number: number;
  helperText: string;
}) => (
  <Stat p={5} shadow="md" borderWidth="1px" borderRadius="md" w={"auto"}>
    <StatLabel>{label}</StatLabel>
    <StatNumber>R$ {number.toLocaleString("pt-BR")}</StatNumber>
    <StatHelpText>{helperText}</StatHelpText>
  </Stat>
);

const Cards = ({ transactions }: LineChartProps) => {
  const { filteredTransactions } = useFilters(transactions);

  const parseDate = (date: string | number): Date => {
    return new Date(date);
  };

  const isValidDate = (date: string | number) =>
    !isNaN(parseDate(date).getTime());

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normaliza para ignorar o horário

  const isPastOrToday = (date: string | number) =>
    isValidDate(date) && parseDate(date) <= today;

  const isFuture = (date: string | number) =>
    isValidDate(date) && parseDate(date) > today;

  const calculateTotals = (transactions: ITransaction[]) => {
    const income = transactions
      .filter((t) => t.transaction_type === "deposit" && isPastOrToday(t.date))
      .reduce((sum, t) => sum + formatAmount(t.amount), 0);

    const expenses = transactions
      .filter((t) => t.transaction_type === "withdraw" && isPastOrToday(t.date))
      .reduce((sum, t) => sum + formatAmount(t.amount), 0);

    const provisioned = transactions
      .filter((t) => t.transaction_type === "withdraw" && isFuture(t.date))
      .reduce((sum, t) => sum + formatAmount(t.amount), 0);

    const futureIncome = transactions
      .filter((t) => t.transaction_type === "deposit" && isFuture(t.date))
      .reduce((sum, t) => sum + formatAmount(t.amount), 0);

    const balance = income - expenses;

    return { income, expenses, provisioned, futureIncome, balance };
  };

  const { income, expenses, provisioned, futureIncome, balance } =
    calculateTotals(filteredTransactions);

  return (
    <SimpleGrid columns={[2, null, 4]} spacing={6} mb={8} w={"100%"}>
      <Card label="Receitas" number={income} helperText="Total de entradas" />
      <Card label="Despesas" number={expenses} helperText="Total de saídas" />
      <Card
        label="Provisionamento"
        number={provisioned}
        helperText="Total de despesas futuras"
      />
      <Card
        label="Lançamentos futuros"
        number={futureIncome}
        helperText="Total de lançamentos futuros"
      />
      <Card label="Saldo Total" number={balance} helperText="Saldo atual" />
    </SimpleGrid>
  );
};

export default Cards;