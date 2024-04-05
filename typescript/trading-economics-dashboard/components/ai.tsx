import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { FC } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface AIProps {}

const AI: FC<AIProps> = ({}) => {
  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="flex flex-col gap-4 md:gap-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl">
            Invest Differently
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative max-sm:w-[230px] sm:w-[450px] md:w-[550px] xl:w-[600px]">
            <Input
              className="w-full font-light max-sm:text-xs font-mono"
              placeholder="How is my portfolio?"
              type="search"
            />
          </div>
          <Button variant="ghost" size="icon" type="submit">
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </main>
  );
};

export default AI;
