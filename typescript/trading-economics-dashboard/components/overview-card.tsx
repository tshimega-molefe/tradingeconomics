"use client";
import { FC, useState, useEffect } from "react";
import { useSearchResult } from "@/hooks/use-search-result";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@phosphor-icons/react";
import CountryDataTable from "./country-data-table";
import FinancialDataTable from "./financial-data-table";
import { FinancialData } from "@/types/financial-data";
import { CountryData } from "@/types/country-data";

interface OverviewCardProps {}

const OverviewCard: FC<OverviewCardProps> = () => {
  const { data, isLoading, isError } = useSearchResult();
  const [dataType, setDataType] = useState<"country" | "financial" | "unknown">(
    "unknown"
  );

  useEffect(() => {
    if (data && data.length > 0) {
      setDataType("Country" in data[0] ? "country" : "financial");
    }
  }, [data]);

  if (isLoading) {
    return <Spinner className="animate-spin w-4 h-4" />; // TODO: Create a loading skeleton
  }

  if (isError || !data) {
    return <div>Error loading data</div>; // TODO: Create an error state for failed error loading
  }

  const financialData = data as FinancialData[];
  const countryData = data as CountryData[];

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex flex-row items-center text-2xl">
          {dataType === "financial" ? (
            <h2 className="text-2xl font-bold uppercase">
              {financialData[0].stock}
            </h2>
          ) : (
            <h2 className="text-2xl font-semibold capitalize">
              {countryData[0].Country}
            </h2>
          )}
        </CardTitle>
        <CardDescription>
          {dataType === "country" ? "Geographic Summary" : "Financial Summary"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {dataType === "country" ? <CountryDataTable /> : <FinancialDataTable />}
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
