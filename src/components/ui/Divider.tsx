import { cn } from "@/lib/utils";

export function Divider({ vertical, className }: { vertical?: boolean; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(vertical ? "inline-block w-px self-stretch bg-line" : "block h-px w-full bg-line", className)}
    />
  );
}
