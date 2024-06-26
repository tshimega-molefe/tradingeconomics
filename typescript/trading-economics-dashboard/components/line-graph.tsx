"use client";
import { FC, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

import { ResponsiveLine } from "@nivo/line";
import { useSearchResult } from "@/hooks/use-search-result";
import { Spinner } from "@phosphor-icons/react";
import { FinancialData } from "@/types/financial-data";
import { transformFinancialData } from "@/lib/utils/transform-financial-data";
import { CountryData } from "@/types/country-data";
import { transformCountryData } from "@/lib/utils/transform-country-data";

interface LineGraphProps {}

const LineGraph: FC<LineGraphProps> = ({}) => {
  const { data, isLoading, isError } = useSearchResult();
  const [dataType, setDataType] = useState<"country" | "financial" | "unknown">(
    "unknown"
  );
  useEffect(() => {
    if (data && data.length > 0) {
      setDataType("Country" in data[0] ? "country" : "financial");
    }
  }, [data]);

  if (isLoading) {
    return <Spinner className="animate-spin" />;
  }

  if (isError || !data) {
    return <div>Error loading data</div>;
  }

  const financialData = data as FinancialData[];
  const countryData = data as CountryData[];

  return (
    <Card className="md:row-span-1 xl:col-span-5 lg:col-span-4 lg:row-span-3 md:col-span-4 xl:row-span-1">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl xl:text-3xl font-semibold uppercase">
          {dataType === "country"
            ? countryData[0].Country
            : financialData[0].stock}
        </CardTitle>
      </CardHeader>
      <CardContent className="xl:h-[320px]">
        {dataType === "financial" ? (
          <ResponsiveLine
            data={transformFinancialData(financialData)}
            margin={{ top: 10, right: 120, bottom: 45, left: 70 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: true,
              reverse: false,
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Quarter ended:",
              legendOffset: 36,
              legendPosition: "middle",
              truncateTickAt: 0,
            }}
            axisLeft={{
              tickSize: 2,
              tickPadding: 5,
              tickRotation: 0,
              legend: "$USD in Millions",
              legendOffset: -60,
              legendPosition: "middle",
              truncateTickAt: 0,
            }}
            pointSize={5}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            enableTouchCrosshair={true}
            useMesh={true}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 0.1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <ResponsiveLine
            data={transformCountryData(countryData)}
            margin={{ top: 10, right: 120, bottom: 45, left: 70 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: true,
              reverse: false,
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 2,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Dates",
              legendOffset: 36,
              legendPosition: "middle",
              truncateTickAt: 0,
            }}
            axisLeft={{
              tickSize: 2,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Interest Rate",
              legendOffset: -60,
              legendPosition: "middle",
              truncateTickAt: 0,
            }}
            pointSize={5}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            enableTouchCrosshair={true}
            useMesh={true}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 0.1,
                    },
                  },
                ],
              },
            ]}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default LineGraph;
