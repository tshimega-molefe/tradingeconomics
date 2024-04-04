import { Inter as FontSans } from "next/font/google";
import { Staatliches } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const staat = Staatliches({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-staat",
});
