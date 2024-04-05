import { FC } from "react";

interface LineGraphProps {}

const LineGraph: FC<LineGraphProps> = ({}) => {
  return (
    <div className="md:row-span-1 xl:col-span-3 lg:col-span-4 lg:row-span-3 md:col-span-4 bg-red-300 xl:row-span-1">
      LineGraph
    </div>
  );
};

export default LineGraph;
