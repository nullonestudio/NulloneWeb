"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Draws the vertical line with scroll and lights up each [data-step] as the line reaches it. */
export function ProcessTimeline({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const line = root.current!.querySelector<HTMLElement>("[data-line]");
      const steps = gsap.utils.toArray<HTMLElement>("[data-step]");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduce) {
        steps.forEach((s) => s.setAttribute("data-active", ""));
        if (line) gsap.set(line, { scaleY: 1 });
        return;
      }

      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 60%", end: "bottom 60%", scrub: true },
          },
        );
      }
      steps.forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 60%",
          onEnter: () => step.setAttribute("data-active", ""),
          onLeaveBack: () => step.removeAttribute("data-active"),
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative">
      {children}
    </div>
  );
}
