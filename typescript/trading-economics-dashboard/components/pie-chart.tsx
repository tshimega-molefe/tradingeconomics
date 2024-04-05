import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface PieChartProps {}

const PieChart: FC<PieChartProps> = ({}) => {
  return (
    <Card className="md:row-span-1 xl:row-span-3 lg:row-span-2 md:col-span-2">
      <CardHeader>
        <CardTitle>Pie Chart</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default PieChart;
