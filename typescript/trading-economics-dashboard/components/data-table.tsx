import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface DataTableProps {}

const DataTable: FC<DataTableProps> = ({}) => {
  return (
    <Card className="md:row-span-1 xl:row-span-3 lg:row-span-2 xl:col-span-3 md:col-span-2">
      <CardHeader>
        <CardTitle>Data Table</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default DataTable;
