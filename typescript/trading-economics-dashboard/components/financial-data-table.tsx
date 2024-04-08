import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Spinner } from "@phosphor-icons/react";
import { useSearchResult } from "@/hooks/use-search-result";
import { FinancialData } from "@/types/financial-data";
import { calculatePercentageChange, cn } from "@/lib/utils/utils";
import { Badge } from "./ui/badge";

interface FinancialDataTableProps {}

const FinancialDataTable: FC<FinancialDataTableProps> = () => {
  const { data, isLoading, isError } = useSearchResult();
  if (isLoading) {
    return <Spinner className="animate-spin" />;
  }

  if (isError || !data) {
    return <div>Error loading data</div>;
  }

  const financialData = data as FinancialData[];

  const marketCap = financialData.find(
    (item) => item.financialSymbol === "market-capitalization"
  );
  const ebitda = financialData.find(
    (item) => item.financialSymbol === "ebitda"
  );
  const peRatio = financialData.find((item) => item.financialSymbol === "pe");
  const eps = financialData.find((item) => item.financialSymbol === "eps");

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Metric</TableHead>
          <TableHead>Prev Close</TableHead>
          <TableHead>Open</TableHead>
          <TableHead>Δ%</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {marketCap && (
          <TableRow>
            <TableCell>Market Cap</TableCell>
            <TableCell>{marketCap.value2}</TableCell>
            <TableCell
              className={
                marketCap.last <= marketCap.value2
                  ? "text-destructive"
                  : "text-emerald-600"
              }
            >
              {marketCap.last}
            </TableCell>
            <TableCell>
              {calculatePercentageChange(
                marketCap.last,
                marketCap.value2
              ).toFixed(2)}
              %
            </TableCell>
          </TableRow>
        )}
        {ebitda && (
          <TableRow>
            <TableCell>EBITDA</TableCell>
            <TableCell>{ebitda.value2}</TableCell>
            <TableCell
              className={
                ebitda.last <= ebitda.value2
                  ? "text-destructive"
                  : "text-emerald-600"
              }
            >
              {ebitda.last}
            </TableCell>
            <TableCell>
              <Badge
                className={cn(
                  "font-mono text-xs",
                  ebitda.last <= ebitda.value2
                    ? "bg-destructive"
                    : "bg-emerald-600"
                )}
              >
                {calculatePercentageChange(ebitda.last, ebitda.value2).toFixed(
                  2
                )}
                %
              </Badge>
            </TableCell>
          </TableRow>
        )}
        {peRatio && (
          <TableRow>
            <TableCell>P/E Ratio</TableCell>
            <TableCell>{peRatio.value2}</TableCell>
            <TableCell
              className={
                peRatio.last <= peRatio.value2
                  ? "text-destructive"
                  : "text-emerald-600"
              }
            >
              {peRatio.last}
            </TableCell>
            <TableCell>
              <Badge
                className={cn(
                  "font-mono text-xs",
                  peRatio.last <= peRatio.value2
                    ? "bg-destructive"
                    : "bg-emerald-600"
                )}
              >
                {calculatePercentageChange(
                  peRatio.last,
                  peRatio.value2
                ).toFixed(2)}
                %
              </Badge>
            </TableCell>
          </TableRow>
        )}
        {eps && (
          <TableRow>
            <TableCell>EPS</TableCell>
            <TableCell>{eps.value2}</TableCell>
            <TableCell
              className={
                eps.last <= eps.value2 ? "text-destructive" : "text-emerald-600"
              }
            >
              {eps.last}
            </TableCell>
            <TableCell>
              <Badge
                className={cn(
                  "font-mono text-xs",
                  eps.last <= eps.value2 ? "bg-destructive" : "bg-emerald-600"
                )}
              >
                {calculatePercentageChange(eps.last, eps.value2).toFixed(2)}%
              </Badge>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default FinancialDataTable;
