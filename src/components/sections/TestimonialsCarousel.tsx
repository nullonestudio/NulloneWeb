"use client";

import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/content/testimonials";
import { LogoMark } from "@/components/ui/Logo";

/** Draggable momentum carousel (Framer Motion drag) with keyboard/arrow controls. */
export function TestimonialsCarousel({ items }: { items: Testimonial[] }) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const x = useMotionValue(0);
  const reduce = useReducedMotion();
  const [bounds, setBounds] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const measure = () => {
      if (!viewport.current || !track.current) return;
      const overflow = track.current.scrollWidth - viewport.current.offsetWidth;
      setBounds({ left: -Math.max(0, overflow), right: 0 });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (viewport.current) ro.observe(viewport.current);
    return () => ro.disconnect();
  }, []);

  const step = (dir: 1 | -1) => {
    const card = track.current?.querySelector("li");
    const w = card ? card.getBoundingClientRect().width + 24 : 400;
    const next = Math.min(bounds.right, Math.max(bounds.left, x.get() - dir * w));
    animate(x, next, reduce ? { duration: 0 } : { type: "spring", stiffness: 200, damping: 30 });
  };

  return (
    <div>
      <div ref={viewport} className="overflow-hidden" data-cursor="Drag">
        <motion.ul
          ref={track}
          drag="x"
          dragConstraints={bounds}
          dragElastic={0.08}
          dragTransition={{ power: 0.25, timeConstant: 260 }}
          style={{ x }}
          className="flex w-max cursor-grab gap-6 active:cursor-grabbing"
          aria-label="Client testimonials"
        >
          {items.map((t, i) => (
            <li
              key={i}
              className="flex w-[82vw] shrink-0 select-none flex-col justify-between gap-12 border border-line bg-surface p-7 sm:w-[28rem] md:p-10 lg:w-[32rem]"
            >
              <LogoMark className="h-8 w-8 text-white/30" />
              <blockquote>
                <p className="font-display text-lg leading-snug tracking-tight md:text-2xl">&ldquo;{t.quote}&rdquo;</p>
              </blockquote>
              <div className="flex items-end justify-between gap-6 border-t border-line pt-6">
                <div>
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="mt-1 text-sm text-secondary">{t.role}</p>
                </div>
                {t.project ? <p className="label text-right text-muted-text">{t.project}</p> : null}
              </div>
            </li>
          ))}
        </motion.ul>
      </div>
      <div className="mt-10 flex items-center gap-3">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous testimonial"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-line-strong transition-colors hover:bg-white hover:text-black"
        >
          <ArrowLeft size={16} aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next testimonial"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-line-strong transition-colors hover:bg-white hover:text-black"
        >
          <ArrowRight size={16} aria-hidden />
        </button>
        <span className="label ml-4 text-muted-text">Drag to explore</span>
      </div>
    </div>
  );
}
