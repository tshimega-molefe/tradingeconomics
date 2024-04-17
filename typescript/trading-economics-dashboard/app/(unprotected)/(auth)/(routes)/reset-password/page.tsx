import ResetPasswordForm from "@/app/(unprotected)/_components/reset-password-form";
import Logo from "@/components/logo";
import { Suspense } from "react";

const Page = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row md:h-screen w-full">
      <section className="flex items-center justify-center px-4 md:px-0 md:flex md:w-2/3 md:border-r md:border-muted-foreground/20">
        <div className="w-full max-w-sm py-4 mx-auto my-auto min-w-min md:py-9 md:w-7/12">
          <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </section>
      <section className="flex items-start w-full max-sm:px-2 mx-auto md:px-0 md:items-center md:w-1/3">
        <div className="flex w-[400px] max-sm:px-1  mx-auto md:-ml-12 my-auto min-w-min pt-4 md:py-4 bg-background">
          <Logo size="5xl" />
        </div>
      </section>
    </div>
  );
};

export default Page;
