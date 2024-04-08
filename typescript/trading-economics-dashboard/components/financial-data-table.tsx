import { useSearchResult } from "@/hooks/use-search-result";
import { calculatePercentageChange, cn } from "@/lib/utils/utils";
import { FinancialData } from "@/types/financial-data";
import { Spinner } from "@phosphor-icons/react";
import { FC } from "react";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

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
  const currency = financialData.find((item) => item.currency === "currency");

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Metric</TableHead>
          <TableHead>Prev</TableHead>
          <TableHead>Open</TableHead>
          <TableHead>Δ%</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {marketCap && (
          <TableRow>
            <TableCell>Mark. Cap</TableCell>
            <TableCell>{marketCap.value2.toFixed(2)}</TableCell>
            <TableCell
              className={
                marketCap.last <= marketCap.value2
                  ? "text-destructive"
                  : "text-emerald-700"
              }
            >
              {marketCap.last.toFixed(2)}
            </TableCell>
            <TableCell>
              <Badge
                className={cn(
                  "font-mono text-xs",
                  marketCap.last <= marketCap.value2
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-emerald-800 text-destructive-foreground"
                )}
              >
                {calculatePercentageChange(
                  marketCap.last,
                  marketCap.value2
                ).toFixed(2)}
                %
              </Badge>
            </TableCell>
          </TableRow>
        )}
        {ebitda && (
          <TableRow>
            <TableCell>EBITDA</TableCell>
            <TableCell>{ebitda.value2.toFixed(2)}</TableCell>
            <TableCell
              className={
                ebitda.last <= ebitda.value2
                  ? "text-destructive"
                  : "text-emerald-700"
              }
            >
              {ebitda.last.toFixed(2)}
            </TableCell>
            <TableCell>
              <Badge
                className={cn(
                  "font-mono text-xs",
                  ebitda.last <= ebitda.value2
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-emerald-800 text-destructive-foreground"
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
            <TableCell>{peRatio.value2.toFixed(2)}</TableCell>
            <TableCell
              className={
                peRatio.last <= peRatio.value2
                  ? "text-destructive"
                  : "text-emerald-700"
              }
            >
              {peRatio.last.toFixed(2)}
            </TableCell>
            <TableCell>
              <Badge
                className={cn(
                  "font-mono text-xs",
                  peRatio.last <= peRatio.value2
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-emerald-800 text-destructive-foreground"
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
            <TableCell>{eps.value2.toFixed(2)}</TableCell>
            <TableCell
              className={
                eps.last <= eps.value2 ? "text-destructive" : "text-emerald-700"
              }
            >
              {eps.last.toFixed(2)}
            </TableCell>
            <TableCell>
              <Badge
                className={cn(
                  "font-mono text-xs",
                  eps.last <= eps.value2
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-emerald-800 text-destructive-foreground"
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
