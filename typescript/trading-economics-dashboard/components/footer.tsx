import Link from "next/link";
import { FC } from "react";
import { Button } from "./ui/button";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className="h-fit w-full flex flex-row items-center justify-center gap-2">
      <Button
        variant="link"
        size="sm"
        asChild
        className="transition-all active:scale-[0.98590] duration-100 ease-in-out font-mono text-muted-foreground text-[10px]"
      >
        <Link href="">Pro</Link>
      </Button>
      <Button
        variant="link"
        size="sm"
        asChild
        className="transition-all active:scale-[0.98590] duration-100 ease-in-out font-mono text-muted-foreground text-[10px]"
      >
        <Link href="">About</Link>
      </Button>
      <Button
        variant="link"
        size="sm"
        asChild
        className="transition-all active:scale-[0.98590] duration-100 ease-in-out font-mono text-muted-foreground text-[10px]"
      >
        <Link href="">Careers</Link>
      </Button>
    </footer>
  );
};

export default Footer;
