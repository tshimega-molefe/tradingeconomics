"use client";
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

import { ResponsiveLine } from "@nivo/line";

interface LineGraphProps {}

const LineGraph: FC<LineGraphProps> = ({}) => {
  const mockData = [
    {
      id: "japan",
      color: "hsl(317, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 279,
        },
        {
          x: "helicopter",
          y: 197,
        },
        {
          x: "boat",
          y: 121,
        },
        {
          x: "train",
          y: 107,
        },
        {
          x: "subway",
          y: 15,
        },
        {
          x: "bus",
          y: 91,
        },
        {
          x: "car",
          y: 166,
        },
        {
          x: "moto",
          y: 111,
        },
        {
          x: "bicycle",
          y: 18,
        },
        {
          x: "horse",
          y: 45,
        },
        {
          x: "skateboard",
          y: 183,
        },
        {
          x: "others",
          y: 294,
        },
      ],
    },
    {
      id: "france",
      color: "hsl(268, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 218,
        },
        {
          x: "helicopter",
          y: 194,
        },
        {
          x: "boat",
          y: 124,
        },
        {
          x: "train",
          y: 268,
        },
        {
          x: "subway",
          y: 8,
        },
        {
          x: "bus",
          y: 36,
        },
        {
          x: "car",
          y: 25,
        },
        {
          x: "moto",
          y: 151,
        },
        {
          x: "bicycle",
          y: 218,
        },
        {
          x: "horse",
          y: 161,
        },
        {
          x: "skateboard",
          y: 65,
        },
        {
          x: "others",
          y: 57,
        },
      ],
    },
    {
      id: "us",
      color: "hsl(208, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 131,
        },
        {
          x: "helicopter",
          y: 248,
        },
        {
          x: "boat",
          y: 241,
        },
        {
          x: "train",
          y: 201,
        },
        {
          x: "subway",
          y: 25,
        },
        {
          x: "bus",
          y: 37,
        },
        {
          x: "car",
          y: 52,
        },
        {
          x: "moto",
          y: 234,
        },
        {
          x: "bicycle",
          y: 99,
        },
        {
          x: "horse",
          y: 10,
        },
        {
          x: "skateboard",
          y: 176,
        },
        {
          x: "others",
          y: 50,
        },
      ],
    },
    {
      id: "germany",
      color: "hsl(196, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 199,
        },
        {
          x: "helicopter",
          y: 33,
        },
        {
          x: "boat",
          y: 238,
        },
        {
          x: "train",
          y: 43,
        },
        {
          x: "subway",
          y: 94,
        },
        {
          x: "bus",
          y: 85,
        },
        {
          x: "car",
          y: 159,
        },
        {
          x: "moto",
          y: 29,
        },
        {
          x: "bicycle",
          y: 165,
        },
        {
          x: "horse",
          y: 164,
        },
        {
          x: "skateboard",
          y: 283,
        },
        {
          x: "others",
          y: 23,
        },
      ],
    },
    {
      id: "norway",
      color: "hsl(203, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 34,
        },
        {
          x: "helicopter",
          y: 192,
        },
        {
          x: "boat",
          y: 40,
        },
        {
          x: "train",
          y: 147,
        },
        {
          x: "subway",
          y: 59,
        },
        {
          x: "bus",
          y: 188,
        },
        {
          x: "car",
          y: 219,
        },
        {
          x: "moto",
          y: 149,
        },
        {
          x: "bicycle",
          y: 151,
        },
        {
          x: "horse",
          y: 97,
        },
        {
          x: "skateboard",
          y: 22,
        },
        {
          x: "others",
          y: 158,
        },
      ],
    },
  ];

  return (
    <Card className="md:row-span-1 xl:col-span-3 lg:col-span-4 lg:row-span-3 md:col-span-4 xl:row-span-1">
      <CardHeader>
        <CardTitle>Line Graph</CardTitle>
      </CardHeader>
      <CardContent className="xl:h-[320px]">
        <ResponsiveLine
          data={mockData}
          margin={{ top: 10, right: 90, bottom: 45, left: 50 }}
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
            legend: "transportation",
            legendOffset: 36,
            legendPosition: "middle",
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "count",
            legendOffset: -40,
            legendPosition: "middle",
            truncateTickAt: 0,
          }}
          pointSize={10}
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
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </CardContent>
    </Card>
  );
};

export default LineGraph;
