import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileJsx } from "@phosphor-icons/react/dist/ssr";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface OverviewCardProps {}

const OverviewCard: FC<OverviewCardProps> = ({}) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex flex-row items-center text-2xl">
          Stock Quarterly Results
          <FileJsx className="ml-3 w-5 h-5" />
        </CardTitle>
        <CardDescription>Frequency and Currency</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>AAPL</TableHead>
              <TableHead>Prev Close</TableHead>
              <TableHead>Open</TableHead>
            </TableRow>
            <TableRow>
              <TableHead>USD</TableHead>
              <TableHead>Date 2</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">assets</TableCell>
              <TableCell className="text-green-500 font-semibold">
                125.90
              </TableCell>
              <TableCell className="text-red-500 font-semibold">
                122.15
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                cash-and-equivalents
              </TableCell>
              <TableCell className="text-green-500 font-semibold">
                2765.00
              </TableCell>
              <TableCell className="text-red-500 font-semibold">
                2745.00
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">TSLA</TableCell>
              <TableCell className="text-red-500 font-semibold">
                750.00
              </TableCell>
              <TableCell className="text-green-500 font-semibold">
                780.00
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">AMZN</TableCell>
              <TableCell className="text-green-500 font-semibold">
                3275.00
              </TableCell>
              <TableCell className="text-red-500 font-semibold">
                3250.00
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">MSFT</TableCell>
              <TableCell className="text-green-500 font-semibold">
                245.00
              </TableCell>
              <TableCell className="text-red-500 font-semibold">
                240.00
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
