// File: pages/api/financial.ts

import { NextRequest } from "next/server";
import { findAndEncodeQueryPart } from "@/lib/utils/utils";
import { FinancialData } from "@/types/financial-data";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const searchQuery = searchParams.get("q") || "aapl:us";

  const { encodedQuery, type, error } = findAndEncodeQueryPart(searchQuery);

  if (error || type !== "symbol") {
    return new Response(
      JSON.stringify({ error: error || "Invalid type for this endpoint" }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const apiKey = process.env.TRADING_ECONOMICS_API_KEY;
  if (!apiKey) {
    throw new Error(
      "TRADING_ECONOMICS_API_KEY environment variable is not set."
    );
  }

  const url = `https://api.tradingeconomics.com/financials/symbol/${encodedQuery}?c=${apiKey}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "API-Key": apiKey,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }

  const data = (await res.json()) as FinancialData[];

  console.log(data);
  console.log(`Data fetched for symbol: ${encodedQuery}`);

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
