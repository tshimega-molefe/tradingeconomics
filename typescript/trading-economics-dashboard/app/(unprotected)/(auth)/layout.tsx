import type { Metadata } from "next";

import "@/styles/globals.css";

import { fontSans, staat } from "../../../lib/fonts";
import { cn } from "../../../lib/utils";

import { Toaster } from "../../../components/ui/sonner";
import { ThemeProvider } from "../../../components/theme-provider";

export const metadata: Metadata = {
  title: "Trading Economics Dashboard | Built by Tshimega Molefe",
  description:
    "The application is a real-time financial dashboard integrated with the Trading Economics API, enabling users to monitor live economic data and market indicators. It offers a comprehensive view of global financial markets, featuring real-time updates, historical data analysis, and user customization options for tracking specific economic indicators and currencies. This tool is designed for financial analysts, traders, and economic enthusiasts seeking up-to-date market insights.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background font-sans antialiased flex items-center justify-center max-md:py-10 overflow-hidden max-sm:overflow-y-scroll",
          fontSans.variable,
          staat.variable
        )}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
