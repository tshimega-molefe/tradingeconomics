import { FC } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/utils";

interface LogoProps {
  size?: "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl";
  href?: string;
  className?: string;
}

// Define a mapping object for size to Tailwind CSS classes
const sizeClasses = {
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
  "7xl": "text-7xl",
  "8xl": "text-8xl",
  "9xl": "text-9xl",
};

const Logo: FC<LogoProps> = ({ size = "7xl", href = "/", className }) => {
  const textSizeClass = sizeClasses[size];

  return (
    <Link
      href={href}
      className={cn(
        `text-primary font-serif transition-all duration-100 ease-in-out active:scale-[0.98855] cursor-pointer relative z-20 ${textSizeClass}`,
        className
      )}
    >
      Leviathan Investments Inc.
    </Link>
  );
};

export default Logo;
