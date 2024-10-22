import React from 'react';
import { Heading } from "@chakra-ui/react";

interface FilterSummaryProps {
  total: number;
}

const FilterSummary: React.FC<FilterSummaryProps> = ({ total }) => {
  return (
    <Heading as="h4" size="md">
      Total: {total}
    </Heading>
  );
};

export default FilterSummary;
