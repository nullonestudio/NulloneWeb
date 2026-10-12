"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useState } from "react";
import type { Project } from "@/content/projects";

/** Index list of projects with a floating image preview that follows the cursor (fine pointers only). */
export function ProjectIndex({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 24, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 200, damping: 24, mass: 0.5 });

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onPointerLeave={() => setActive(null)}
    >
      <ul className="border-t border-line">
        {projects.map((p, i) => (
          <li key={p.slug} className="border-b border-line">
            <Link
              href={`/work/${p.slug}`}
              data-cursor="View"
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 transition-colors md:grid-cols-[4rem_1fr_14rem_6rem] md:gap-8 md:py-9"
            >
              <span className="label text-muted-text">0{i + 1}</span>
              <span className="font-display text-2xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-3 md:text-5xl">
                {p.title}
              </span>
              <span className="hidden text-sm text-secondary md:block">{p.category}</span>
              <span className="text-right text-sm text-secondary">{p.year}</span>
            </Link>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {active !== null && !reduce ? (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 z-10 hidden lg:block"
            style={{ x: sx, y: sy }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative -translate-x-1/2 -translate-y-1/2 overflow-hidden" style={{ width: 360, height: 250 }}>
              {projects.map((p, i) => (
                <motion.div
                  key={p.slug}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image src={p.cover.src} alt="" fill sizes="360px" className="object-cover" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
