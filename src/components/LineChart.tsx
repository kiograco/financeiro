import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { ITransaction } from "@/types/Transaction";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface LineChartProps {
  transactions: ITransaction[];
}

const LineChart = ({ transactions }: LineChartProps) => {
  const sortedTransactions = [...transactions].sort((a, b) => a.date - b.date);

  let balance = 0;
  const dates = sortedTransactions.map(t => new Date(t.date).toLocaleDateString("pt-BR"));
  const balances = sortedTransactions.map(t => {
    const amount = parseFloat(t.amount) / 100;
    balance += t.transaction_type === "deposit" ? amount : -amount;
    return balance;
  });

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Saldo",
        data: balances,
        fill: true,
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        borderColor: "#2196f3",
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { display: true },
      y: { display: true },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
