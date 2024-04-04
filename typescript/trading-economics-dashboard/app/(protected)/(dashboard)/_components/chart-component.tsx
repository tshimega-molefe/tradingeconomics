"use client";
import { FC } from "react";

import { FinancialData } from "@/types/financial-data";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CompanyLineChartProps {
  company: FinancialData[] | null;
}

const CompanyLineChart: FC<CompanyLineChartProps> = ({ company }) => {
  if (!company) {
    return null;
  }
  const labels = company.map((data) => data.Symbol);

  const data = {
    labels,
    datasets: [
      {
        label: "Last Value",
        data: company.map((data) => data.last),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <div>
      <h1>Financial Data Line Chart</h1>
      <Line data={data} />
    </div>
  );
};

export default CompanyLineChart;
