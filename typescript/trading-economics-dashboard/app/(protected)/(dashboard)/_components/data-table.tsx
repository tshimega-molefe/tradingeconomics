import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FC } from "react";

import { FinancialData } from "@/types/financial-data";

interface DataTableProps {
  company: FinancialData[] | null;
}

const DataTable: FC<DataTableProps> = ({ company }) => {
  if (!company) {
    return null;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Symbol</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Last</TableHead>
          <TableHead>Value 1</TableHead>
          <TableHead>Date 1</TableHead>
          <TableHead>Value 2</TableHead>
          <TableHead>Date 2</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Currency</TableHead>
          <TableHead>Frequency</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Financial Symbol</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {company.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.Symbol}</TableCell>
            <TableCell>{item.Date}</TableCell>
            <TableCell>{item.last}</TableCell>
            <TableCell>{item.value1}</TableCell>
            <TableCell>{item.date1}</TableCell>
            <TableCell>{item.value2}</TableCell>
            <TableCell>{item.date2}</TableCell>
            <TableCell>{item.unit}</TableCell>
            <TableCell>{item.currency}</TableCell>
            <TableCell>{item.frequency}</TableCell>
            <TableCell>{item.stock}</TableCell>
            <TableCell>{item.financialSymbol}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
