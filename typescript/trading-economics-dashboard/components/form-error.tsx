import { Warning } from "@phosphor-icons/react/dist/ssr";
import { FC } from "react";

interface FormErrorProps {
  message?: string;
}

const FormError: FC<FormErrorProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-haul/10 px-3 py-2 border border-destructive/50 flex rounded-md items-center gap-x-2 text-sm text-haul">
      <Warning className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
