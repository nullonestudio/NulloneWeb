import { Fragment, type ElementType, type FC } from "react";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** ms delay before the first word */
  delay?: number;
  id?: string;
};

/**
 * Split-text, word-by-word masked slide-up.
 * Server component: every word is in the HTML. RevealObserver (client) toggles [data-in] on scroll.
 */
export function RevealText({ text, as = "h2", className, delay = 0, id }: Props) {
  const words = text.split(" ");
  const Tag = as as unknown as FC<Record<string, unknown>>;
  return (
    <Tag
      id={id}
      data-reveal="words"
      className={className}
      style={delay ? ({ "--delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="reveal-word">
            <span style={{ "--i": i } as React.CSSProperties}>{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}

/** Fade + rise on scroll. Server component wrapper. */
export function FadeIn({
  children,
  as = "div",
  className,
  delay = 0,
  ...rest
}: {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
} & Record<string, unknown>) {
  const Tag = as as unknown as FC<Record<string, unknown>>;
  return (
    <Tag
      data-reveal="fade"
      className={cn(className)}
      style={delay ? ({ "--delay": `${delay}ms` } as React.CSSProperties) : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
