import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || "aapl:us";
  const encodedQuery = encodeURIComponent(query);

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

  const data = await res.json();

  return Response.json({ data });
}
