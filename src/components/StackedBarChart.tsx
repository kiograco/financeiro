// components/StackedBarChart.tsx
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { ITransaction } from "@/types/Transaction";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface StackedBarChartProps {
  transactions: ITransaction[];
}

const StackedBarChart = ({ transactions }: StackedBarChartProps) => {
  const industries = Array.from(new Set(transactions.map(t => t.industry)));

  const deposits = industries.map(industry =>
    transactions
      .filter(t => t.industry === industry && t.transaction_type === "deposit")
      .reduce((sum, t) => sum + parseFloat(t.amount) / 100, 0)
  );

  const withdrawals = industries.map(industry =>
    transactions
      .filter(t => t.industry === industry && t.transaction_type === "withdraw")
      .reduce((sum, t) => sum + parseFloat(t.amount) / 100, 0)
  );

  const data = {
    labels: industries,
    datasets: [
      {
        label: "Receitas",
        data: deposits,
        backgroundColor: "#4caf50",
      },
      {
        label: "Despesas",
        data: withdrawals,
        backgroundColor: "#f44336",
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
  };

  return <Bar data={data} options={options} />;
};

export default StackedBarChart;