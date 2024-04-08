"use client";
import { FC } from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";
import { useSearchResult } from "@/hooks/use-search-result";
import { Spinner } from "@phosphor-icons/react";

interface CountryDataTableProps {}

const CountryDataTable: FC<CountryDataTableProps> = ({}) => {
  const { data, isLoading, isError } = useSearchResult();
  if (isLoading) {
    return <Spinner className="animate-spin" />;
  }

  if (isError || !data) {
    return <div>Error loading data</div>;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Country</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Title</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* Render table rows based on `data` and `dataType` */}
      </TableBody>
    </Table>
  );
};

export default CountryDataTable;
