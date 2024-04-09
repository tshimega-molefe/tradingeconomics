import { CountryData } from "@/types/country-data";

interface CountryFinancialDataPoint {
  x: string; // Date in a readable format
  y: number; // Value normalized or in its original unit
}

interface TransformedCountryData {
  id: string;
  color: string;
  data: CountryFinancialDataPoint[];
}

function getRandomGray() {
  const brightness = Math.floor(Math.random() * 156) + 100; // Range: 100-255 for lighter grays
  const grayValue = brightness.toString(16);
  return `#${grayValue}${grayValue}${grayValue}`;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function formatValue(value: number, unit: string): number {
  // Check if the unit is already a percentage
  if (unit.includes("percent")) {
    return value; // Return the percentage value directly
  } else if (unit.includes("Million")) {
    return value / 1_000_000;
  } else if (unit.includes("Thousand")) {
    return value / 1_000;
  }
  return value; // Return the value directly if no specific unit processing is required
}

export const transformCountryData = (
  countryData: CountryData[]
): TransformedCountryData[] => {
  // Define the categories of interest
  const selectedCategories = [
    "Deposit Interest Rate",
    "Interbank Rate",
    "Interest Rate",
    // Add other categories as needed
  ];

  return countryData
    .filter((cd) => cd.Category && selectedCategories.includes(cd.Category))
    .map((cd) => ({
      id: cd.Category,
      color: getRandomGray(),
      data: [
        {
          x: formatDate(cd.PreviousValueDate),
          y: formatValue(cd.PreviousValue, cd.Unit),
        },
        {
          x: formatDate(cd.LatestValueDate),
          y: formatValue(cd.LatestValue, cd.Unit),
        },
      ],
    }));
};
