import { FC } from "react";
import Link from "next/link";

interface LogoProps {
  size?: "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl";
  href?: string;
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

const Logo: FC<LogoProps> = ({ size = "7xl", href = "/" }) => {
  const textSizeClass = sizeClasses[size];

  return (
    <Link
      href={href}
      className={`text-primary tracking-tighter uppercase font-staat transition-all duration-75 ease-in-out active:scale-95 cursor-pointer ${textSizeClass}`}
    >
      Trading Economics
    </Link>
  );
};

export default Logo;
