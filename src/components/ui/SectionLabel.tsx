import { cn } from "@/lib/utils";

/** Uppercase eyebrow with the 40px hairline above it. */
export function SectionLabel({
  children,
  className,
  as: Tag = "p",
  index,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "p" | "span" | "div";
  index?: string;
}) {
  return (
    <Tag className={cn("flex flex-col gap-4", className)}>
      <span aria-hidden className="hairline" />
      <span className="label flex items-center gap-3">
        {index ? <span className="text-muted-text">{index}</span> : null}
        {children}
      </span>
    </Tag>
  );
}
