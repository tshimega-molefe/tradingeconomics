"use client";

import Link from "next/link";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";

import {
  ResetPasswordSchema,
  TResetPasswordValidator,
} from "../../../lib/validators/reset-email-validator";

import FormError from "../../../components/form-error";
import FormSuccess from "../../../components/form-success";
import { resetEmail } from "../../../server/actions/reset-email";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";

export default function ResetPasswordForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider"
      : "";

  const form = useForm<TResetPasswordValidator>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = ({ email }: TResetPasswordValidator) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      resetEmail({ email }).then((data) => {
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
    <div className="flex w-full justify-center sm:w-[400px]">
      <div className="flex flex-col space-y-6 text-start w-full">
        <Form {...form}>
          <form
            className="flex flex-col gap-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <h2 className="text-3xl font-medium font-staat">Reset Password</h2>
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
            <Button
              asChild
              className="place-self-end hover:underline text-muted-foreground -mt-4 px-0"
              size="sm"
              variant="link"
            >
              <Link href="/sign-in" className="">
                Remember Password?
              </Link>
            </Button>
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
                <p>Send Reset Email</p>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
