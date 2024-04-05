import AI from "@/components/ai";
import DataTable from "@/components/data-table";
import HighlightCards from "@/components/highlight-cards";
import LineGraph from "@/components/line-graph";
import PieChart from "@/components/pie-chart";
import { FC } from "react";

interface DashboardHomePageProps {
  searchParams: {
    q: string;
  };
}

const DashboardHomePage: FC<DashboardHomePageProps> = ({
  searchParams: { q },
}) => {
  const inputSearchParams = q;

  if (!inputSearchParams) {
    return <AI />;
  } else {
    return (
      <main className="flex-1 grid xl:grid-cols-5 md:grid-cols-4 md:grid-rows-3 lg:grid-rows-6 xl:grid-rows-2 grid-cols-1 gap-4">
        <HighlightCards />
        <LineGraph />
        <DataTable />
        <PieChart />
      </main>
    );
  }
};

export default DashboardHomePage;
