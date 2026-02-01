import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip
);

function ChartView({ logs }) {
  const data = {
    labels: logs.map(item => item.site),
    datasets: [
      {
        label: "Minutes Spent",
        data: logs.map(item =>
          (item.timeSpent / 60000).toFixed(1)
        ),
        backgroundColor: "#4f46e5",
        borderRadius: 6
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } }
  };

  return <Bar data={data} options={options} />;
}

export default ChartView;