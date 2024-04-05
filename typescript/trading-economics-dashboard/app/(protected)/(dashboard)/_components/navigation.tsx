"use client";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bell, FileJsx, House } from "@phosphor-icons/react";
import Link from "next/link";
import { FC } from "react";

interface NavigationProps {}

const Navigation: FC<NavigationProps> = ({}) => {
  return (
    <div className="hidden border-r bg-background/80 lg:block">
      <div className="flex h-full min-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6 sticky top-0 bg-background">
          <Logo size="3xl" />
          <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium gap-5">
            <Link
              className="flex items-center gap-3 rounded-lg bg-secondary px-3 py-2 transition-all hover:bg-accent"
              href="#"
            >
              <House className="h-4 w-4 mr-1" />
              Home
            </Link>
          </nav>
        </div>
        <div className="sticky bottom-0 p-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex flex-row items-center">
                View Example API
                <FileJsx className="ml-3 w-5 h-5" />
              </CardTitle>
              <CardDescription>
                Click the button below to view an example of the api endpoint
                data from Trading Economics for Mexico
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="sm" asChild>
                <Link href="/api/search?q=mexico">View API Route</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
