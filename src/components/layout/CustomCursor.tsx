"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Dot + lagging ring. Elements with [data-cursor="View"|"Drag"|...] expand the ring and show the label.
 * Only mounted on fine pointers without reduced motion (see CursorLoader).
 */
export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      setLabel(labelled?.dataset.cursor ?? null);
      setHovering(!!target?.closest("a, button, [role='button'], input, select, textarea, label, summary"));
    };
    const leave = () => setVisible(false);
    const pd = () => setDown(true);
    const pu = () => setDown(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", pd);
    window.addEventListener("pointerup", pu);
    document.addEventListener("pointerleave", leave);
    return () => {
      html.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", pd);
      window.removeEventListener("pointerup", pu);
      document.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  const ringScale = label ? 2.6 : hovering ? 1.5 : 1;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]" style={{ opacity: visible ? 1 : 0, transition: "opacity .3s" }}>
      <motion.div
        className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
        style={{ x, y, scale: label ? 0 : down ? 0.6 : 1 }}
      />
      <motion.div className="absolute left-0 top-0" style={{ x: rx, y: ry }}>
        <motion.div
          className="flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50"
          animate={{
            scale: down ? ringScale * 0.85 : ringScale,
            backgroundColor: label ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)",
            borderColor: label ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.5)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
        >
          <motion.span
            className="text-[5px] font-semibold uppercase tracking-[0.2em] text-black"
            animate={{ opacity: label ? 1 : 0 }}
          >
            {label}
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  );
}
