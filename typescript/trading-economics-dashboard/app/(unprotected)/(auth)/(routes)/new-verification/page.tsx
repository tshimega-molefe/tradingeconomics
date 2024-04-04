import NewVerificationForm from "@/app/(unprotected)/_components/new-verification-form";

type VerificationEmailPageProps = {};

const VerificationEmailPage = (props: VerificationEmailPageProps) => {
  return (
    <div className="px-4 flex items-center justify-center md:h-screen overflow-hidden">
      <NewVerificationForm />
    </div>
  );
};
export default VerificationEmailPage;
