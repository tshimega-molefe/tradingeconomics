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
import { useSearchStore } from "@/store/use-search-store";

import { useSearchResult } from "@/hooks/use-search-result";
import { ChatsTeardrop, LockLaminated, Spinner } from "@phosphor-icons/react";
import Link from "next/link";
import { FC } from "react";

interface NavigationProps {}

const Navigation: FC<NavigationProps> = () => {
  const { searchQuery, clearSearchQuery } = useSearchStore();
  const { data, isLoading, isError } = useSearchResult();

  return (
    <div className="hidden border-r bg-background/80 lg:block">
      <div className="flex h-full min-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6 sticky top-0 bg-background">
          <Logo size="xl" />
          <Button
            className="ml-auto h-8 w-8"
            size="icon"
            variant="outline"
            onClick={() => clearSearchQuery()}
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <ChatsTeardrop className="h-4 w-4" />
                <span className="sr-only">Chat with Leviathan</span>
              </>
            )}
          </Button>
        </div>
        <div className="flex-1 p-4">
          {searchQuery &&
            (isLoading ? (
              <Spinner className="animate-spin w-4 h-4" />
            ) : (
              <OverviewCard />
            ))}
          {!searchQuery && <div>AI Tabs</div>}
        </div>
        <div className="sticky bottom-2 p-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex flex-row items-center text-xl">
                Early Access
                <LockLaminated className="ml-3 w-5 h-5" />
              </CardTitle>
              <CardDescription>
                Our Trading Economics subdomain is free to use until May 22nd,
                2024.
                <br />
                <br />
                Subscribing now gives you a 50% discount on your first 365 days
                of use.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full text-base" size="lg" asChild>
                <Link
                  href="https://instagram.com/tshimegamolefe"
                  target="_blank"
                >
                  Subscribe Now
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
