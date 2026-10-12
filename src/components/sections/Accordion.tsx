"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

type Item = { question: string; answer: string };

/**
 * Smooth-height accordion (grid-rows 0fr→1fr). Answers stay in the HTML for crawlers;
 * collapsed panels are `inert` so they're skipped by keyboard and assistive tech.
 */
export function Accordion({ items, headingLevel: H = "h3" }: { items: Item[]; headingLevel?: "h2" | "h3" }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <ul className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btn = `${base}-q${i}`;
        const panel = `${base}-a${i}`;
        return (
          <li key={item.question} className="border-b border-line">
            <H className="font-sans">
              <button
                id={btn}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-8"
              >
                <span className="font-display text-lg font-medium tracking-tight transition-colors group-hover:text-white md:text-2xl">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isOpen ? "rotate-[135deg] border-white bg-white text-black" : "border-line-strong",
                  )}
                >
                  <span className="absolute h-px w-3.5 bg-current" />
                  <span className="absolute h-3.5 w-px bg-current" />
                </span>
              </button>
            </H>
            <div
              id={panel}
              role="region"
              aria-labelledby={btn}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-8 pr-14 text-[15px] leading-relaxed text-secondary md:text-base">{item.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
