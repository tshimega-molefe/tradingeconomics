import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { FC } from "react";

import { Button } from "@/components/ui/button";
import { House, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

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
          <Input
            className="w-full bg-background shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3"
            placeholder="Search indicators..."
            type="search"
          />
        </div>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
