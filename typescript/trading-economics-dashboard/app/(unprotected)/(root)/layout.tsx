import type { Metadata } from "next";

import "@/styles/globals.css";

import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils/utils";
import { fontSans, staat } from "@/lib/utils/fonts";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Trading Economics Dashboard | Built by Tshimega Molefe",
  description:
    "The application is a real-time financial dashboard integrated with the Trading Economics API, enabling users to monitor live economic data and market indicators. It offers a comprehensive view of global financial markets, featuring real-time updates, historical data analysis, and user customization options for tracking specific economic indicators and currencies. This tool is designed for financial analysts, traders, and economic enthusiasts seeking up-to-date market insights.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen overflow-x-hidden bg-background font-sans antialiased",
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
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
