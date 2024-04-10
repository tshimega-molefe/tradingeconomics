"use client";

import { cn } from "@/lib/utils/utils";
import Link from "next/link";

import { Button, buttonVariants } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Separator } from "../../../components/ui/separator";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";

import {
  AuthCredentialsSchema,
  TAuthCredentialsValidator,
} from "../../../lib/validators/account-credentials-validator";
import { SignIn } from "../../../server/actions/sign-in";
import ProviderButton from "./provider-button";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../../components/ui/input-otp";

import { Loader2 } from "lucide-react";
import React, { useState, useTransition } from "react";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";

export default function SignInForm() {
  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider"
      : "";

  const form = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const onSubmit = (values: TAuthCredentialsValidator) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      SignIn(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Uh Oh! Something went wrong!"));
    });
  };

  return (
    <div className="flex w-full justify-center sm:w-[400px]">
      <div className="flex flex-col space-y-6 text-start w-full">
        <Form {...form}>
          <form
            className="flex flex-col gap-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <h2 className="text-3xl font-medium font-staat">Sign In</h2>
            <div className="flex flex-row items-center justify-start">
              <p className="text-center text-sm">No account yet?</p>
              <Link
                href="/create-account"
                className={cn(
                  buttonVariants({ variant: "link", size: "default" }),
                  "-ml-3"
                )}
              >
                Create a new account.
              </Link>
            </div>
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <InputOTP
                        pattern={REGEXP_ONLY_DIGITS}
                        maxLength={6}
                        disabled={isPending}
                        {...field}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Enter the one-time 2FA code sent to&nbsp;
                      {form.getValues().email}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          className="border border-muted-foreground/20"
                          placeholder="you@company.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="border border-muted-foreground/20"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  asChild
                  className="place-self-end hover:underline text-muted-foreground -mt-4 px-0"
                  size="sm"
                  variant="link"
                >
                  <Link href="/reset-password">Forgotten Password?</Link>
                </Button>
              </>
            )}
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <Button
              disabled={isPending}
              variant="default"
              size="default"
              type="submit"
            >
              {isPending ? (
                <Loader2 className="animate-spin w-4 h-4 mx-4" />
              ) : (
                <p>{showTwoFactor ? "Confirm" : "Sign In"}</p>
              )}
            </Button>
          </form>
        </Form>
        <Separator className="bg-muted-foreground/20 relative">
          <span className="absolute left-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center text-sm px-2 -translate-x-1/2 bg-background text-muted-foreground/30 flex-nowrap">
            OR
          </span>
        </Separator>
        <ProviderButton isDisabled={isPending} provider="google" />
        <p className="text-sm">
          By continuing, you agree to our
          <br />
          <Link
            href="/user-agreement"
            target="_blank"
            className="font-semibold text-nowrap hover:underline cursor-pointer"
          >
            User Agreement
          </Link>
          &nbsp;and&nbsp;
          <Link
            href="/privacy-policy"
            target="_blank"
            className="font-semibold hover:underline cursor-pointer"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
