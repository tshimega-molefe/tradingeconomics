import { auth } from "@/auth";

import { Toaster } from "@/components/ui/sonner";
import { fetchAllUsers } from "@/data/user";
import { currentUser } from "@/lib/utils/auth";
import { fontSans, staat } from "@/lib/utils/fonts";
import { cn } from "@/lib/utils/utils";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import Header from "../../_components/header";

export async function generateStaticParams() {
  const users = await fetchAllUsers();

  return users.map((user) => ({
    id: user.id,
  }));
}

export default async function SupplierRootDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userId = user.id;

  if (userId) {
    redirect(`/trader/${userId}`);
  }

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={cn(
            "w-full h-screen flex flex-col overflow-hidden bg-secondary font-sans antialiased",
            fontSans.variable,
            staat.variable
          )}
        >
          <Header />
          <main className="flex h-full w-full items-center justify-center">
            {children}
          </main>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
