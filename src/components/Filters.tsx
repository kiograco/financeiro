import {
  Select,
  Input,
  Stack,
  Button,
  Heading,
  Collapse,
} from "@chakra-ui/react";
import { ChangeEvent, useState, useEffect } from "react";
import { ITransaction } from "@/types/Transaction";
import { HamburgerIcon } from "@chakra-ui/icons";

interface FiltersProps {
  transactions: ITransaction[];
  handleFilterChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
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

const Filters = ({
  transactions,
  handleFilterChange,
  clearFilters,
}: FiltersProps) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [isExpanded, setIsExpanded] = useState(false);

  const [filteredIndustries, setFilteredIndustries] = useState<
    string[] | number[]
  >([]);
  const [filteredStates, setFilteredStates] = useState<string[] | number[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<
    string[] | number[]
  >([]);

  const getUniqueValues = <K extends keyof ITransaction>(
    key: K,
    items: ITransaction[]
  ): Array<ITransaction[K]> => {
    return Array.from(new Set(items.map((t) => t[key]))).filter(Boolean) as Array<
      ITransaction[K]
    >;
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

    setFilteredAccounts(getUniqueValues("account", filtered));
    setFilteredIndustries(getUniqueValues("industry", filtered));
    setFilteredStates(getUniqueValues("state", filtered));
  };

  const handleFilterUpdate = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };

    setFilters(newFilters);
    localStorage.setItem("filters", JSON.stringify(newFilters));
    applyFilters(newFilters);
    handleFilterChange(e);
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

  return (
    <Stack
      direction={"column"}
      spacing={4}
      justifyContent={isExpanded ? "start" : "center"}
      mr={8}
    >
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
        <Heading as="h4" size="md">
          Filtros
        </Heading>
        <HamburgerIcon />
      </Stack>

      <Collapse in={isExpanded} animateOpacity>
        <Stack spacing={4}>
          <Input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterUpdate}
            placeholder="Data de Início"
            width="300px"
          />
          <Input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterUpdate}
            placeholder="Data de Fim"
            width="300px"
          />
          <Select
            name="account"
            placeholder="Filtrar por Conta"
            value={filters.account}
            onChange={handleFilterUpdate}
            width="300px"
          >
            {filteredAccounts.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>
          <Select
            name="industry"
            placeholder="Filtrar por Indústria"
            value={filters.industry}
            onChange={handleFilterUpdate}
            width="300px"
          >
            {filteredIndustries.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>
          <Select
            name="state"
            placeholder="Filtrar por Estado"
            value={filters.state}
            onChange={handleFilterUpdate}
            width="300px"
          >
            {filteredStates.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>
          <Button onClick={handleClearFilters}>Limpar filtros</Button>
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default Filters;