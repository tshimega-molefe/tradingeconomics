import { FC } from "react";

import SearchInput from "@/components/search-input";
import { ThemeToggle } from "@/components/theme-toggle";
import { Acorn, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-primary-foreground px-6 sticky top-0 z-50">
      <Button
        variant="outline"
        size="icon"
        asChild
        className="lg:hidden w-8 h-8"
      >
        <Link href="/">
          <Acorn className="h-4 w-4" />
          <span className="sr-only">Home</span>
        </Link>
      </Button>

      <div className="w-full flex-1">
        <div className="relative">
          <MagnifyingGlass className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <SearchInput />
        </div>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
