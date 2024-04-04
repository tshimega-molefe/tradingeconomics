import { getCompanyData } from "@/data/trading-economics";
import { Suspense } from "react";
import CompanyLineChart from "../../../_components/chart-component";
import DataTable from "../../../_components/data-table";

type Props = {};

const DashboardHomePage = async (props: Props) => {
  const company = await getCompanyData();
  if (!company) return null;

  return (
    <>
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">
          Company: {company[0].Symbol}
        </h1>
      </div>
      <div className="border shadow-sm rounded-lg flex-1">
        <Suspense fallback={"Loading..."}>
          <DataTable company={company} />
        </Suspense>
      </div>
      <div className="border shadow-sm rounded-lg">
        <Suspense fallback={"Loading..."}>
          <CompanyLineChart company={company} />
        </Suspense>
      </div>
    </>
  );
};

export default DashboardHomePage;
