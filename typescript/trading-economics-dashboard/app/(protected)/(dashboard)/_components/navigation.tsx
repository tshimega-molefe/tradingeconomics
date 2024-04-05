"use client";
import Logo from "@/components/logo";
import OverviewCard from "@/components/overview-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useRouter, useSearchParams } from "next/navigation";

import { ArrowClockwise, LockLaminated, Spinner } from "@phosphor-icons/react";
import Link from "next/link";
import { FC, useState } from "react";

interface NavigationProps {}

const Navigation: FC<NavigationProps> = ({}) => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const inputSearchParams = searchParams.get("q");

  const onRefresh = () => {
    setIsLoading(true);
    router.push("/trader");
  };

  return (
    <div className="hidden border-r bg-background/80 lg:block">
      <div className="flex h-full min-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6 sticky top-0 bg-background">
          <Logo size="xl" />
          <Button
            className="ml-auto h-8 w-8"
            size="icon"
            variant="outline"
            onClick={onRefresh}
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <ArrowClockwise className="h-4 w-4" />
                <span className="sr-only">Refresh Page</span>
              </>
            )}
          </Button>
        </div>
        <div className="flex-1 p-4">
          {inputSearchParams && <OverviewCard />}
          {!inputSearchParams && <div>AI Tabs</div>}
        </div>
        <div className="sticky bottom-2 p-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex flex-row items-center text-xl">
                Early Access
                <LockLaminated className="ml-3 w-5 h-5" />
              </CardTitle>
              <CardDescription>
                Trading Economics is free to use until April 30th, 2024, after
                which this will become a paid service.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full text-base" size="lg" asChild>
                <Link
                  href="https://instagram.com/tshimegamolefe"
                  target="_blank"
                >
                  Extend Free Access
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
