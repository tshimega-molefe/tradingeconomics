"use client";

import { cn } from "../../../lib/utils";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { Label } from "../../../components/ui/label";

import {
  NewPasswordSchema,
  TNewPasswordValidator,
} from "../../../lib/validators/new-password-validator";

import FormError from "../../../components/form-error";
import FormSuccess from "../../../components/form-success";
import { newPassword } from "../../../server/actions/new-password";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";

export default function NewPasswordForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TNewPasswordValidator>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = ({ password, confirmPassword }: TNewPasswordValidator) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword({ password, confirmPassword }, token).then((data) => {
        if (data?.error) {
          reset();
          setError(data.error);
        }
        if (data?.success) {
          reset();
          setSuccess(data.success);
        }
      });
    });
  };

  return (
    <div className="flex w-full justify-center sm:w-[400px]">
      <div className="flex flex-col space-y-6 text-start w-full">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-3xl font-medium font-staat">
            Create A New Password
          </h2>
          <Label
            htmlFor="password"
            className={cn({
              "text-haul": errors.password,
            })}
          >
            Password
          </Label>
          <Input
            {...register("password")}
            disabled={isPending}
            type="password"
            placeholder="Enter new password"
            className={cn(
              {
                "focus-visible:ring-haul": errors.password,
              },
              "border border-muted-foreground/20"
            )}
          />
          <Label
            htmlFor="password"
            className={cn({
              "text-haul": errors.password,
            })}
          >
            Confirm Password
          </Label>
          <Input
            {...register("confirmPassword")}
            disabled={isPending}
            type="password"
            placeholder="Enter password again"
            className={cn(
              {
                "focus-visible:ring-haul": errors.password,
              },
              "border border-muted-foreground/20"
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
          {errors.password && (
            <p className="text-sm text-haul">{errors.password.message}</p>
          )}
          <FormError message={error} />
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
              <p>Confirm New Password</p>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
