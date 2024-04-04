import "@/styles/globals.css";

import { redirect } from "next/navigation";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import { auth } from "@/auth";
import { currentUser } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { fontSans, staat } from "@/lib/fonts";
import { Toaster } from "@/components/ui/sonner";
import { fetchAllUsers } from "@/data/user";
import Navigation from "../../_components/navigation";
import Header from "../../_components/header";

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
            <Navigation />
            <div className="flex flex-col">
              <Header />
              <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                {children}
              </main>
            </div>

            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
