// File: pages/api/country.ts

import { NextRequest } from "next/server";
import { findAndEncodeQueryPart } from "@/lib/utils/utils";
import { CountryData } from "@/types/country-data";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const searchQuery = searchParams.get("q") || "mexico";

  const { encodedQuery, type, error } = findAndEncodeQueryPart(searchQuery);

  if (error || type !== "country") {
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

  const category = searchParams.get("category") || "money";
  const encodedCategory = encodeURIComponent(category);
  const url = `https://api.tradingeconomics.com/country/${encodedQuery}?c=${apiKey}&group=${encodedCategory}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "API-Key": apiKey,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }

  const data = (await res.json()) as CountryData[];

  console.log(data);
  console.log(`Data fetched for country: ${encodedQuery}`);

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
