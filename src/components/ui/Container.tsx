import { cn } from "@/lib/utils";
import type { FC, HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement> & { as?: "div" | "section" | "header" | "footer" | "nav" | "article" };

export function Container({ as = "div", className, ...props }: Props) {
  const Tag = as as unknown as FC<HTMLAttributes<HTMLElement>>;
  return <Tag className={cn("container-x", className)} {...props} />;
}
