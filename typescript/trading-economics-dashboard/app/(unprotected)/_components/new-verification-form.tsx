"use client";

import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import Logo from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { newVerification } from "@/server/actions/new-verification";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

interface NewVerificationFormProps {}

const NewVerificationForm: FC<NewVerificationFormProps> = ({}) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing verification token.");
      setIsLoading(false);
      return;
    }
    newVerification(token)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess(data.success);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setError("Something went wrong!");
        setIsLoading(false);
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Card className="bg-background border border-muted-foreground/20 shadow-xl w-[90vw] md:max-w-md">
      <CardHeader className="flex flex-col">
        <Logo size="6xl" />
        <CardTitle className="text-xl md:text-2xl text-muted-foreground/60 font-semibold font-staat">
          Confirming Your Email Address
        </CardTitle>
        <CardDescription className="text-center pb-2 pt-8">
          {error || success ? (
            <div className="w-full">
              <FormSuccess message={success} />
              {!success && <FormError message={error} />}
            </div>
          ) : (
            <BeatLoader color="#FBF6F0" size={10} className="py-[0.56rem]" />
          )}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link
          href="/sign-in"
          aria-disabled={isLoading}
          className={cn(
            buttonVariants({ variant: "default", size: "default" }),
            "w-full flex flex-row gap-2 font-staat text-base transition-colors duration-75",
            isLoading && "pointer-events-none opacity-40"
          )}
        >
          Back to Sign In
        </Link>
      </CardFooter>
    </Card>
  );
};

export default NewVerificationForm;
