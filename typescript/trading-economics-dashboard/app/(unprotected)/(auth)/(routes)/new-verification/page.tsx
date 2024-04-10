import NewVerificationForm from "@/app/(unprotected)/_components/new-verification-form";
import { Suspense } from "react";

type VerificationEmailPageProps = {};

const VerificationEmailPage = (props: VerificationEmailPageProps) => {
  return (
    <div className="px-4 flex items-center justify-center md:h-screen overflow-hidden">
      <Suspense fallback={<div>Loading...</div>}>
        <NewVerificationForm />
      </Suspense>
    </div>
  );
};
export default VerificationEmailPage;
