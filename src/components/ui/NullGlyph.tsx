"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LOGO } from "./Logo";

/** Animated Ø for the 404: circle draws, slash strikes through, then the mark drifts. */
export function NullGlyph() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className="mx-auto w-full max-w-[28rem] text-white"
      animate={reduce ? undefined : { rotate: [0, -6, 4, 0], y: [0, -10, 0] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox={LOGO.viewBox} fill="none" stroke="currentColor" strokeLinecap="round" className="w-full">
        <motion.circle
          cx={LOGO.circle.cx}
          cy={LOGO.circle.cy}
          r={LOGO.circle.r}
          strokeWidth={2}
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.path
          d={LOGO.slash}
          strokeWidth={2}
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.text
          x={LOGO.circle.cx}
          y={LOGO.circle.cy + 5}
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          fontSize="14"
          letterSpacing="2"
          style={{ fontFamily: "var(--font-sora)" }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: [0, 1, 0.3, 1] }}
          transition={{ duration: 1.2, delay: 1.6 }}
        >
          404
        </motion.text>
      </svg>
    </motion.div>
  );
}
