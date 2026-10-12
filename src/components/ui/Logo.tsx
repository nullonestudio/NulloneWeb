import { cn } from "@/lib/utils";

/** Geometry for the Ø "null" mark — shared with animated variants (preloader, transitions, OG images). */
export const LOGO = {
  viewBox: "0 0 100 100",
  circle: { cx: 54, cy: 46, r: 33 },
  // Slash runs through the centre; bottom-left end extends past the circle edge.
  slash: "M 77 23 L 20 80",
  stroke: 6.5,
} as const;

type LogoMarkProps = {
  className?: string;
  title?: string;
  strokeWidth?: number;
};

/** Inline SVG Ø mark. Uses pathLength=1 so CSS/JS can draw it in via stroke-dashoffset. */
export function LogoMark({ className, title, strokeWidth = LOGO.stroke }: LogoMarkProps) {
  return (
    <svg
      viewBox={LOGO.viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <circle data-logo="circle" cx={LOGO.circle.cx} cy={LOGO.circle.cy} r={LOGO.circle.r} pathLength={1} />
      <path data-logo="slash" d={LOGO.slash} pathLength={1} />
    </svg>
  );
}

type WordmarkProps = { className?: string; size?: "sm" | "md" | "lg" };

export function Wordmark({ className, size = "sm" }: WordmarkProps) {
  const sizes = {
    sm: { top: "text-[13px]", bottom: "text-[7px]" },
    md: { top: "text-lg", bottom: "text-[9px]" },
    lg: { top: "text-3xl md:text-4xl", bottom: "text-[11px] md:text-xs" },
  }[size];
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span className={cn("font-display font-semibold tracking-[0.25em] text-white", sizes.top)}>NULLONE</span>
      <span className={cn("mt-1.5 font-sans font-light tracking-[0.6em] text-secondary", sizes.bottom)}>SOLUTIONS</span>
    </span>
  );
}

/** Logo | divider | wordmark lockup, as on the card. */
export function LogoLockup({ className, size = "sm" }: WordmarkProps) {
  const mark = { sm: "h-7 w-7", md: "h-10 w-10", lg: "h-16 w-16 md:h-20 md:w-20" }[size];
  const div = { sm: "h-7", md: "h-10", lg: "h-16 md:h-20" }[size];
  return (
    <span className={cn("inline-flex items-center gap-3 md:gap-4", className)}>
      <LogoMark className={mark} />
      <span aria-hidden className={cn("w-px bg-white/20", div)} />
      <Wordmark size={size} />
    </span>
  );
}
