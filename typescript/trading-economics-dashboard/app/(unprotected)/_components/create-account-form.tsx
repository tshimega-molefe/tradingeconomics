"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils/utils";
import {
  AuthCredentialsSchema,
  TAuthCredentialsValidator,
} from "@/lib/validators/account-credentials-validator";
import { CreateAccount } from "@/server/actions/create-account";
import { Spinner } from "@phosphor-icons/react";
import Link from "next/link";
import { useState, useTransition } from "react";
import ProviderButton from "./provider-button";

export default function CreateAccountForm() {
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
    },
  });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      CreateAccount({ email, password }).then((data) => {
        if (data?.error) {
          form.reset();
          setError(data.error);
        }
        if (data?.success) {
          form.reset();
          setSuccess(data.success);
        }
      });
    });
  };

  return (
    <div className="flex min-w-full justify-center sm:w-[400px]">
      <div className="flex flex-col space-y-6 text-start w-full">
        <Form {...form}>
          <form
            className="flex flex-col gap-5 w-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <h2 className="text-3xl font-medium font-staat">Create Account</h2>
            <div className="flex flex-row items-center justify-start">
              <p className="text-center text-sm">Already have an account?</p>
              <Link
                href="/sign-in"
                className={cn(
                  buttonVariants({ variant: "link", size: "default" }),
                  "-ml-3"
                )}
              >
                Sign In.
              </Link>
            </div>
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
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <Button
              disabled={isPending}
              variant="default"
              size="default"
              type="submit"
            >
              {isPending ? (
                <Spinner className="animate-spin w-4 h-4 mx-4" />
              ) : (
                <p>Create Account</p>
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
