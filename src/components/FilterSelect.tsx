import React from 'react';
import { Select } from "@chakra-ui/react";

interface FilterSelectProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  placeholder: string;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ name, value, onChange, options, placeholder }) => {
  return (
    <Select name={name} value={value} onChange={onChange} placeholder={placeholder} width="300px">
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Select>
  );
};

export default FilterSelect;
