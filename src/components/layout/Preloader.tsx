"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "@/components/ui/Logo";

const KEY = "nullone:preloaded";
const MIN_MS = 1150; // draw-in finishes ~1.1s; whole sequence stays ≤1.5s

/**
 * SSR-rendered so the draw-in (pure CSS) starts on first paint, before hydration.
 * Plays once per session; skipped entirely for reduced motion (see globals.css + head script).
 */
export function Preloader() {
  const [state, setState] = useState<"playing" | "done" | "gone">("playing");

  useEffect(() => {
    const html = document.documentElement;
    if (html.classList.contains("preloaded") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      html.classList.add("ready");
      setState("gone");
      return;
    }
    const wait = Math.max(0, MIN_MS - performance.now());
    const t1 = setTimeout(() => {
      setState("done");
      html.classList.add("ready");
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
    }, wait);
    const t2 = setTimeout(() => setState("gone"), wait + 950);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (state === "gone") return null;

  const letters = "NULLONE".split("");
  return (
    <div
      id="preloader"
      aria-hidden
      className={`fixed inset-0 z-[100] ${state === "done" ? "is-done pointer-events-none" : ""}`}
    >
      <div className="pl-half pl-top absolute inset-x-0 top-0 h-1/2 bg-bg" />
      <div className="pl-half pl-bottom absolute inset-x-0 bottom-0 h-1/2 bg-bg" />
      <div className="pl-content absolute inset-0 flex flex-col items-center justify-center gap-6">
        <LogoMark className="h-16 w-16 text-white md:h-20 md:w-20" strokeWidth={5} />
        <div className="flex flex-col items-center">
          <span className="flex overflow-hidden font-display text-xl font-semibold tracking-[0.25em] md:text-2xl">
            {letters.map((l, i) => (
              <span key={i} className="pl-letter" style={{ "--i": i } as React.CSSProperties}>
                {l}
              </span>
            ))}
          </span>
          <span className="pl-sub mt-2 text-[9px] font-light tracking-[0.6em] text-secondary md:text-[10px]">SOLUTIONS</span>
        </div>
      </div>
    </div>
  );
}
