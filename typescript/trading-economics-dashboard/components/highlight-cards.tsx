import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface HighlightCardsProps {}

const HighlightCards: FC<HighlightCardsProps> = ({}) => {
  return (
    <div className="md:row-span-1 md:col-span-4 lg:col-span-4 xl:row-span-1 xl:col-span-2">
      <div className="grid xl:grid-cols-2 xl:grid-rows-2 grid-cols-4 grid-rows-1 gap-4 h-full">
        <Card className="xl:col-span-1 xl:row-span-1">
          <CardHeader>
            <CardTitle>Card1</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter></CardFooter>
        </Card>
        <Card className="xl:col-span-1 xl:row-span-1">
          <CardHeader>
            <CardTitle>Card2</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter></CardFooter>
        </Card>
        <Card className="xl:col-span-1 xl:row-span-1">
          <CardHeader>
            <CardTitle>Card3</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter></CardFooter>
        </Card>
        <Card className="xl:col-span-1 xl:row-span-1">
          <CardHeader>
            <CardTitle>Card4</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default HighlightCards;
