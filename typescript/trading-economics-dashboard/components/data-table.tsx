import { FC } from "react";

interface DataTableProps {}

const DataTable: FC<DataTableProps> = ({}) => {
  return (
    <div className="md:row-span-1 xl:row-span-3 lg:row-span-2 xl:col-span-3 md:col-span-2 bg-emerald-800">
      DataTable
    </div>
  );
};

export default DataTable;
