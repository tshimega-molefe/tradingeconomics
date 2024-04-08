import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useSearchResult } from "@/hooks/use-search-result";
import { Spinner } from "@phosphor-icons/react";
import { CountryData } from "@/types/country-data";
import { Badge } from "./ui/badge";
import { calculatePercentageChange, cn } from "@/lib/utils/utils";

interface CountryDataTableProps {}

const CountryDataTable: FC<CountryDataTableProps> = ({}) => {
  const { data, isLoading, isError } = useSearchResult();
  if (isLoading) {
    return <Spinner className="animate-spin" />;
  }

  if (isError || !data) {
    return <div>Error loading data</div>;
  }

  const countryData = data as CountryData[];

  const interestRate = countryData.find(
    (item) => item.Category === "Interest Rate"
  );

  const lendingRate = countryData.find(
    (item) => item.Category === "Lending Rate"
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Metric</TableHead>
          <TableHead>Prev</TableHead>
          <TableHead>Open</TableHead>
          <TableHead>Δ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {lendingRate && (
          <TableRow>
            <TableCell>Mark. Cap</TableCell>
            <TableCell>{lendingRate.LatestValue.toFixed(2)}</TableCell>
            <TableCell
              className={
                lendingRate.LatestValue <= lendingRate.PreviousValue
                  ? "text-destructive"
                  : "text-emerald-700"
              }
            >
              {lendingRate.LatestValue.toFixed(2)}
            </TableCell>
            <TableCell>
              <Badge
                className={cn(
                  "font-mono text-xs",
                  lendingRate.LatestValue <= lendingRate.PreviousValue
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-emerald-800 text-destructive-foreground"
                )}
              >
                {calculatePercentageChange(
                  lendingRate.LatestValue,
                  lendingRate.PreviousValue
                ).toFixed(2)}
                %
              </Badge>
            </TableCell>
          </TableRow>
        )}
        {interestRate && (
          <TableRow>
            <TableCell>Interest Rate</TableCell>
            <TableCell>{interestRate.LatestValue}</TableCell>
            <TableCell
              className={
                interestRate.LatestValue <= interestRate.PreviousValue
                  ? "text-destructive"
                  : "text-emerald-700"
              }
            >
              {interestRate.LatestValue}
            </TableCell>
            <TableCell>
              <Badge
                className={cn(
                  "font-mono text-xs",
                  interestRate.LatestValue <= interestRate.PreviousValue
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-emerald-800 text-destructive-foreground"
                )}
              >
                {interestRate.LatestValue - interestRate.PreviousValue}
              </Badge>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CountryDataTable;
