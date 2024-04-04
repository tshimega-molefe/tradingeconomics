import Logo from "@/components/logo";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="flex flex-col gap-4">
        <Logo href="/sign-in" size="5xl" />
        <h2 className="font-staat text-lg text-muted-foreground">
          by Tshimega Molefe
        </h2>
      </div>
    </div>
  );
}
