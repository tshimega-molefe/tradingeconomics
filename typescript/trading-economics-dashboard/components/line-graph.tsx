import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface LineGraphProps {}

const LineGraph: FC<LineGraphProps> = ({}) => {
  return (
    <Card className="md:row-span-1 xl:col-span-3 lg:col-span-4 lg:row-span-3 md:col-span-4 xl:row-span-1">
      <CardHeader>
        <CardTitle>Line Graph</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default LineGraph;
