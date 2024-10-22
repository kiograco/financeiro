import { useState, ChangeEvent, useMemo, useCallback } from "react";
import { ITransaction } from "@/types/Transaction";
import debounce from "lodash.debounce"; // Adicione lodash.debounce para otimizar inputs

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

  // Use `useMemo` para evitar recalcular transações filtradas desnecessariamente
  const filteredTransactions = useMemo(() => {
    console.time("Filtering Transactions"); // Para medir desempenho
    let filtered = transactions;

    if (filters.account) filtered = filtered.filter(t => t.account === filters.account);
    if (filters.industry) filtered = filtered.filter(t => t.industry === filters.industry);
    if (filters.state) filtered = filtered.filter(t => t.state === filters.state);

    if (filters.startDate) {
      const start = new Date(filters.startDate).getTime();
      filtered = filtered.filter(t => t.date >= start);
    }
    if (filters.endDate) {
      const end = new Date(filters.endDate).getTime();
      filtered = filtered.filter(t => t.date <= end);
    }

    console.timeEnd("Filtering Transactions"); // Medir o tempo gasto no filtro
    return filtered;
  }, [filters, transactions]);

  const debouncedFilterChange = useMemo(
    () =>
      debounce((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
      }, 300),
    [setFilters]
  );
  
  const handleFilterChange = useCallback(debouncedFilterChange, [debouncedFilterChange]);  

  return { filters, handleFilterChange, filteredTransactions };
};