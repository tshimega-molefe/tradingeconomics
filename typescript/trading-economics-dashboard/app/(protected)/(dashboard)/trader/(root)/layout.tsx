import { auth } from "@/auth";

import { fontSans, staat } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import Header from "../../_components/header";
import { Toaster } from "@/components/ui/sonner";
import { redirect } from "next/navigation";
import { fetchAllUsers } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";

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
          <Header id={userId} />
          <main className="flex h-full w-full items-center justify-center">
            {children}
          </main>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
