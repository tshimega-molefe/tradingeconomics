import Logo from "@/components/logo";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="min-h-screen relative w-full overflow-hidden bg-background flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-background z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <div className={cn("flex flex-col gap-4")}>
        <Logo href="/sign-in" size="5xl" className="max-md:text-xl" />
        <p className={cn("text-xs md:text-sm font-mono relative z-20")}>
          <span className="text-xs font-mono text-muted-foreground">
            founded:&nbsp;
          </span>
          2024
        </p>
      </div>
    </div>
  );
}
