import React, { ChangeEvent, useState, useEffect } from "react";
import {
  Stack,
  Button,
  Collapse,
} from "@chakra-ui/react";
import { ITransaction } from "@/types/Transaction";
import { HamburgerIcon } from "@chakra-ui/icons";
import FilterInput from './FilterInput';
import FilterSelect from './FilterSelect';
import FilterSummary from './FilterSummary';

interface FiltersProps {
  transactions: ITransaction[];
  handleFilterChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  clearFilters: () => void;
}

interface FilterState {
  account: string;
  industry: string;
  state: string;
  startDate: string;
  endDate: string;
}

const initialFilters: FilterState = {
  account: "",
  industry: "",
  state: "",
  startDate: "",
  endDate: "",
};

const Filters: React.FC<FiltersProps> = ({ transactions, handleFilterChange, clearFilters }) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [isExpanded, setIsExpanded] = useState(false);
  const [filteredAccounts, setFilteredAccounts] = useState<string[]>([]);
  const [filteredIndustries, setFilteredIndustries] = useState<string[]>([]);
  const [filteredStates, setFilteredStates] = useState<string[]>([]);
  const [totalSum, setTotalSum] = useState<number>(0);

  const getUniqueValues = <K extends keyof ITransaction>(key: K, items: ITransaction[]): Array<ITransaction[K]> => {
    return Array.from(new Set(items.map((t) => t[key]))).filter(Boolean) as Array<ITransaction[K]>;
  };

  const applyFilters = (currentFilters: FilterState) => {
    let filtered = transactions;

    if (currentFilters.account) {
      filtered = filtered.filter((t) => t.account === currentFilters.account);
    }
    if (currentFilters.industry) {
      filtered = filtered.filter((t) => t.industry === currentFilters.industry);
    }
    if (currentFilters.state) {
      filtered = filtered.filter((t) => t.state === currentFilters.state);
    }
    if (currentFilters.startDate) {
      filtered = filtered.filter((t) => new Date(t.date) >= new Date(currentFilters.startDate));
    }
    if (currentFilters.endDate) {
      filtered = filtered.filter((t) => new Date(t.date) <= new Date(currentFilters.endDate));
    }

    setFilteredAccounts(getUniqueValues("account", filtered));
    setFilteredIndustries(getUniqueValues("industry", filtered));
    setFilteredStates(getUniqueValues("state", filtered));

    return filtered; // Retorna as transações filtradas
  };

  const handleFilterUpdate = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };

    setFilters(newFilters);
    localStorage.setItem("filters", JSON.stringify(newFilters));
    handleFilterChange(e); // Chama a função para lidar com a mudança de filtro
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
    localStorage.removeItem("filters");
    applyFilters(initialFilters);
    clearFilters();
  };

  useEffect(() => {
    const savedFilters = localStorage.getItem("filters");
    if (savedFilters) {
      const parsedFilters = JSON.parse(savedFilters);
      setFilters(parsedFilters);
      applyFilters(parsedFilters);
    } else {
      setFilteredAccounts(getUniqueValues("account", transactions));
      setFilteredIndustries(getUniqueValues("industry", transactions));
      setFilteredStates(getUniqueValues("state", transactions));
    }
  }, [transactions]);

  // Usar useEffect para calcular a soma sempre que os filtros ou transações mudarem
  useEffect(() => {
    const filteredTransactions = applyFilters(filters); // Chama applyFilters para obter transações filtradas
    const sum = filteredTransactions.reduce((acc, transaction) => acc + transaction.value, 0); // Cálculo da soma
    setTotalSum(sum); // Atualiza a soma total
  }, [filters, transactions]); // Dependências: filtros e transações

  return (
    <Stack direction={"column"} spacing={4} justifyContent={isExpanded ? "start" : "center"} mr={8}>
      <Stack
        width={"100%"}
        direction={"row"}
        alignItems={"center"}
        justify={"space-between"}
        paddingY={2}
        spacing={2}
        onClick={() => setIsExpanded(!isExpanded)}
        transform={isExpanded ? "none" : "rotate(270deg)"}
        cursor={"pointer"}
        title={`${isExpanded ? "Ocultar" : "Expandir"} filtros`}
      >
        <h4>Filtros</h4>
        <HamburgerIcon />
      </Stack>

      <Collapse in={isExpanded} animateOpacity>
        <Stack spacing={4}>
          <FilterInput
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterUpdate}
            placeholder="Data de Início"
          />
          <FilterInput
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterUpdate}
            placeholder="Data de Fim"
          />
          <FilterSelect
            name="account"
            value={filters.account}
            onChange={handleFilterUpdate}
            options={filteredAccounts}
            placeholder="Filtrar por Conta"
          />
          <FilterSelect
            name="industry"
            value={filters.industry}
            onChange={handleFilterUpdate}
            options={filteredIndustries}
            placeholder="Filtrar por Indústria"
          />
          <FilterSelect
            name="state"
            value={filters.state}
            onChange={handleFilterUpdate}
            options={filteredStates}
            placeholder="Filtrar por Estado"
          />
          <Button onClick={handleClearFilters}>Limpar filtros</Button>
          <FilterSummary total={totalSum} /> {/* Componente para exibir a soma total */}
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default Filters;