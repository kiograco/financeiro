import { useState, ChangeEvent, useMemo, useCallback } from "react";
import { ITransaction } from "@/types/Transaction";
import debounce from "lodash.debounce"; // Para otimizar inputs com debounce

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

export const useFilters = (transactions: ITransaction[]) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Função para converter o valor de data em um objeto Date válido
  const parseDate = (date: string | number): Date =>
    typeof date === "number" ? new Date(date) : new Date(date);

  const isValidDate = (date: string | number) =>
    !isNaN(parseDate(date).getTime());

  const filteredTransactions = useMemo(() => {
    console.time("Filtering Transactions");

    let filtered = transactions;

    // Aplicação dos filtros por conta, indústria e estado
    if (filters.account) {
      filtered = filtered.filter((t) => t.account === filters.account);
    }
    if (filters.industry) {
      filtered = filtered.filter((t) => t.industry === filters.industry);
    }
    if (filters.state) {
      filtered = filtered.filter((t) => t.state === filters.state);
    }

    // Aplicação dos filtros por data de início e fim
    if (filters.startDate) {
      const start = new Date(filters.startDate).getTime();
      filtered = filtered.filter(
        (t) => isValidDate(t.date) && parseDate(t.date).getTime() >= start
      );
    }
    if (filters.endDate) {
      const end = new Date(filters.endDate).getTime();
      filtered = filtered.filter(
        (t) => isValidDate(t.date) && parseDate(t.date).getTime() <= end
      );
    }

    console.timeEnd("Filtering Transactions");
    return filtered;
  }, [filters, transactions]);

  // Debounce para otimizar alterações nos filtros
  const debouncedFilterChange = useMemo(
    () =>
      debounce(
        (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
          const { name, value } = e.target;
          setFilters((prev) => ({ ...prev, [name]: value }));
        },
        300 // 300ms para evitar chamadas excessivas
      ),
    []
  );

  const handleFilterChange = useCallback(
    debouncedFilterChange,
    [debouncedFilterChange]
  );

  return { filters, handleFilterChange, filteredTransactions };
};