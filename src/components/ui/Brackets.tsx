import { cn } from "@/lib/utils";

/** QR-style corner-bracket frame. Wrap any element. */
export function Brackets({
  children,
  className,
  size,
}: {
  children?: React.ReactNode;
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={cn("brackets", className)}
      style={size ? ({ "--bracket-size": `${size}px` } as React.CSSProperties) : undefined}
    >
      <span aria-hidden className="brackets-b" />
      {children}
    </div>
  );
}

/** SVG hairline that traces around the parent `.trace` element on hover. */
export function TraceLine() {
  return (
    <svg aria-hidden className="trace-line" width="100%" height="100%" overflow="visible">
      <rect x="0" y="0" width="100%" height="100%" pathLength={1} />
    </svg>
  );
}
