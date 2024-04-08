import { FinancialData } from "@/types/financial-data";

interface FinancialDataPoint {
  x: string;
  y: number;
}

interface TransformedFinancialData {
  id: string;
  color: string;
  data: FinancialDataPoint[];
}

// Function to generate a random muted gray color
function getRandomGray() {
  const brightness = Math.floor(Math.random() * 156) + 100; // Range: 100-255 for lighter grays
  const grayValue = brightness.toString(16);
  return `#${grayValue}${grayValue}${grayValue}`;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // January is 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export const transformFinancialData = (
  financialData: FinancialData[]
): TransformedFinancialData[] => {
  const selectedIds = ["ebit", "ebitda", "assets", "cash-and-cash-equivalents"];

  return financialData
    .filter((fd) => selectedIds.includes(fd.financialSymbol.toLowerCase()))
    .map((fd) => ({
      id: fd.financialSymbol,
      color: getRandomGray(),
      data: [
        { x: formatDate(fd.date4), y: fd.value4 },
        { x: formatDate(fd.date3), y: fd.value3 },
        { x: formatDate(fd.date2), y: fd.value2 },
        { x: formatDate(fd.date1), y: fd.value1 },
      ],
    }));
};
