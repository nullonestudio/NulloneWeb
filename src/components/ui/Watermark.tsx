import { cn } from "@/lib/utils";
import { LogoMark } from "./Logo";

/** Giant, faint, cropped Ø that bleeds off a section edge. Parent must be `relative overflow-hidden`. */
export function Watermark({ className, spin }: { className?: string; spin?: boolean }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute select-none text-white opacity-[0.06]", className)}>
      <LogoMark className={cn("h-full w-full", spin && "motion-safe:animate-spin-slow")} strokeWidth={2.2} />
    </div>
  );
}
