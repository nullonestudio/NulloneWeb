import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/** "Web • Mobile • Games • AR/VR • Custom Software" */
export function ServiceLine({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-3 gap-y-2 label", className)} aria-label="Our services">
      {siteConfig.serviceLine.map((s, i) => (
        <li key={s} className="flex items-center gap-3">
          {i > 0 ? <span aria-hidden className="h-1 w-1 rounded-full bg-white/40" /> : null}
          <span>{s}</span>
        </li>
      ))}
    </ul>
  );
}
