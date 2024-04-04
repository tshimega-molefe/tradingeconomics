import { FC } from "react";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";

interface FormSuccessProps {
  message?: string;
}

const FormSuccess: FC<FormSuccessProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-900/10 px-3 py-2 border border-emerald-500/20 flex rounded-md items-center gap-x-2 text-sm text-emerald-700">
      <CheckCircle className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
