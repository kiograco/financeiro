import React from 'react';
import { Input } from "@chakra-ui/react";

interface FilterInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const FilterInput: React.FC<FilterInputProps> = ({ name, value, onChange, placeholder }) => {
  return (
    <Input
      type="date"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      width="300px"
    />
  );
};

export default FilterInput;
