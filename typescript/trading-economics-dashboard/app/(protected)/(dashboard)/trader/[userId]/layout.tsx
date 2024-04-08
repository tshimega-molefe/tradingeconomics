import "@/styles/globals.css";

import { redirect } from "next/navigation";

import { auth } from "@/auth";
import QueryProvider from "@/components/query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { fetchAllUsers } from "@/data/user";
import { currentUser } from "@/lib/utils/auth";
import { fontSans, staat } from "@/lib/utils/fonts";
import { cn } from "@/lib/utils/utils";
import { SessionProvider } from "next-auth/react";
import Header from "../../_components/header";
import Navigation from "../../_components/navigation";

export async function generateStaticParams() {
  const users = await fetchAllUsers();

  return users.map((user) => ({
    id: user.id,
  }));
}

export default async function TraderDashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    userId: string;
  };
}) {
  const session = await auth();
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userId = user.id;

  if (userId !== params.userId) {
    redirect(`/trader/${userId}`);
  }

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={cn(
            "grid h-screen min-h-screen lg:grid-cols-[380px_1fr]",
            fontSans.variable,
            staat.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>
              <Navigation />
              <div className="flex flex-col">
                <Header />
                <main className="flex flex-1 p-4 md:p-6">{children}</main>
              </div>

              <Toaster />
            </QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
