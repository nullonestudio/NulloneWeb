import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/ui/Logo";

/** CSS-only infinite marquee; pauses on hover. Content is duplicated (second copy aria-hidden) for a seamless loop. */
export function Marquee({
  items,
  className,
  duration = 40,
  size = "lg",
  label,
  reverse,
}: {
  items: readonly string[];
  className?: string;
  duration?: number;
  size?: "lg" | "sm";
  label: string;
  reverse?: boolean;
}) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center">
          <span
            className={cn(
              "whitespace-nowrap px-6 md:px-10",
              size === "lg"
                ? "font-display text-5xl font-medium uppercase tracking-tight md:text-8xl"
                : "text-sm font-medium uppercase tracking-[0.3em] text-secondary md:text-base",
              size === "lg" && i % 2 === 1 && "text-stroke",
            )}
          >
            {item}
          </span>
          {size === "lg" ? (
            <LogoMark className="h-8 w-8 text-white/30 md:h-12 md:w-12" strokeWidth={4} />
          ) : (
            <span aria-hidden className="h-1 w-1 rounded-full bg-white/30" />
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      role="region"
      aria-label={label}
      className={cn("group relative flex overflow-hidden mask-fade-x", className)}
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
    >
      <div
        className={cn(
          "flex w-max animate-marquee group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
        )}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
