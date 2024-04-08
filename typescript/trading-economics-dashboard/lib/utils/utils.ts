import {
  PERMITTED_COUNTRIES,
  PERMITTED_SYMBOLS,
} from "@/config/permitted-trading-economics-api-datapoints";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ============== Error Handling ==============
export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong on the server";
  }

  return message;
};

// ============== Query Encoding ==============
export function findAndEncodeQueryPart(searchQuery: string) {
  if (!searchQuery) return { error: "No search query provided" };

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const foundCountry = PERMITTED_COUNTRIES.find((country) =>
    normalizedQuery.includes(country)
  );
  const foundSymbol = PERMITTED_SYMBOLS.find((symbol) =>
    normalizedQuery.includes(symbol)
  );

  if (foundCountry) {
    return { encodedQuery: encodeURIComponent(foundCountry), type: "country" };
  } else if (foundSymbol) {
    return { encodedQuery: encodeURIComponent(foundSymbol), type: "symbol" };
  } else {
    return { error: "No results found" };
  }
}

// ============== Percentage Change ===========
export const calculatePercentageChange = (
  current: number,
  previous: number
) => {
  if (previous === 0) return 0; // To avoid division by zero
  return ((current - previous) / previous) * 100;
};
