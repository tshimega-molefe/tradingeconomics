"use client";
import { FC } from "react";
import { useSearchStore } from "@/store/use-search-store";

import AI from "@/components/ai";
import DataTable from "@/components/data-table";
import Footer from "@/components/footer";
import HighlightCards from "@/components/highlight-cards";
import LineGraph from "@/components/line-graph";
import PieChart from "@/components/pie-chart";
import { useSearchResult } from "@/hooks/use-search-result";

const DashboardHomePage: FC = () => {
  const { searchQuery } = useSearchStore();
  const { data, isLoading, isError } = useSearchResult();

  if (!searchQuery) {
    return (
      <div className="flex flex-col gap-2 w-full">
        <AI />
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error fetching data</div>;
  }

  return (
    <main className="flex-1 grid xl:grid-cols-5 md:grid-cols-4 md:grid-rows-3 lg:grid-rows-6 xl:grid-rows-2 grid-cols-1 gap-4">
      <HighlightCards />
      <LineGraph />
      <DataTable />
      <PieChart />
    </main>
  );
};

export default DashboardHomePage;
