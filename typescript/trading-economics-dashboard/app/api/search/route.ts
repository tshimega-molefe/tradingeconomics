import {
  PERMITTED_COUNTRIES,
  PERMITTED_SYMBOLS,
} from "@/config/permitted-trading-economics-api-datapoints";
import { CountryData } from "@/types/country-data";
import { FinancialData } from "@/types/financial-data";
import { NextRequest } from "next/server";

function findAndEncodeQueryPart(searchQuery: string) {
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

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const searchQuery = searchParams.get("q") || "";

  const { encodedQuery, type, error } = findAndEncodeQueryPart(searchQuery);

  if (error) {
    return new Response(JSON.stringify({ error }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = process.env.TRADING_ECONOMICS_API_KEY;
  if (!apiKey) {
    throw new Error(
      "TRADING_ECONOMICS_API_KEY environment variable is not set."
    );
  }

  let url = "";
  if (type === "country") {
    const category = searchParams.get("category") || "gdp";
    const encodedCategory = encodeURIComponent(category);
    url = `https://api.tradingeconomics.com/country/${encodedQuery}?c=${apiKey}&group=${encodedCategory}`;
  } else if (type === "symbol") {
    url = `https://api.tradingeconomics.com/financials/symbol/${encodedQuery}?c=${apiKey}`;
  }

  // Ensure the URL has been set
  if (!url) {
    return new Response(JSON.stringify({ error: "Invalid query type" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "API-Key": apiKey,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }

  const data: FinancialData[] | CountryData[] = await res.json();
  console.log(data);

  return Response.json({ data });
}
