"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroParticles = dynamic(() => import("./HeroParticles"), { ssr: false });

/**
 * Three.js is only fetched after the page is idle, on ≥768px screens,
 * with motion allowed and no data-saver — keeps it out of the LCP/TBT path.
 */
export function HeroParticlesLoader() {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const ok =
      window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)").matches && !conn?.saveData;
    if (!ok) return;

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      if ("requestIdleCallback" in window) idleId = window.requestIdleCallback(() => setLoad(true), { timeout: 2500 });
      else timeoutId = setTimeout(() => setLoad(true), 1200);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      window.removeEventListener("load", start);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return load ? <HeroParticles /> : null;
}
