import ProviderButton from "@/app/(unprotected)/_components/provider-button";
import { auth } from "@/auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { redirect } from "next/navigation";

export default async function ErrorPage() {
  const session = await auth();

  if (!session) {
    return (
      <Card className="w-full max-w-md mx-auto my-auto absolute top-1/2 -translate-y-1/2 bg-black/5 shadow-xl">
        <CardHeader className="flex flex-col items-center space-y-2">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-staat font-medium text-haul">
              Session Expired
            </h2>
            <p className="text-sm text-muted-foreground text-pretty">
              Your session has expired. Please log in again to continue.
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground/70 text-center text-pretty">
              Click the button below to log in and return to Haul.
            </p>
          </div>
          <ProviderButton provider="google" />
        </CardContent>
      </Card>
    );
  } else {
    redirect("/trader");
  }
}
