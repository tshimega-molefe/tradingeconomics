import { FC } from "react";

import SearchInput from "@/components/search-input";
import { ThemeToggle } from "@/components/theme-toggle";
import { House, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-secondary px-6 sticky top-0 z-10 ">
      <Link
        className="lg:hidden flex items-center gap-2 font-semibold"
        href="/"
      >
        <House className="h-5 w-5" />
        <span className="sr-only">Home</span>
      </Link>
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
