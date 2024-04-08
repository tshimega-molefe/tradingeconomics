"use client";

import { FC, useState } from "react";

import { signIn } from "next-auth/react";

import { Spinner } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn, getErrorMessage } from "@/lib/utils/utils";
import { Icons } from "@/components/icons";

interface ProviderButtonProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  isDisabled?: boolean;
  provider:
    | "apple"
    | "google"
    | "auth0"
    | "github"
    | "twitter"
    | "email"
    | "facebook"
    | "instagram";
}

const ProviderButton: FC<ProviderButtonProps> = ({
  provider,
  isDisabled,
  className,
  ...props
}) => {
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsGoogleLoading(true);
    try {
      await signIn(provider, {
        redirect: false,
      });
    } catch (error) {
      console.error(getErrorMessage(error));
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div
      className={cn("flex flex-col gap-2 justify-center", className)}
      {...props}
    >
      <Button
        variant="secondary"
        size="sm"
        className="w-full active:opacity-50 transition-opacity duration-150 ease"
        onClick={loginWithGoogle}
        disabled={isGoogleLoading || isDisabled}
      >
        {isGoogleLoading ? (
          <Spinner className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Icons.google className="w-4 h-4 mr-2" />
        )}
        Google
      </Button>
    </div>
  );
};

export default ProviderButton;
