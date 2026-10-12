"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  strength?: number;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
};

const variants: Record<Variant, string> = {
  primary: "bg-white text-black [--sweep:#0a0a0a] hover:text-white border border-white",
  outline: "border border-white/25 text-white [--sweep:#fff] hover:text-black hover:border-white",
  ghost: "text-white [--sweep:rgba(255,255,255,0.08)]",
};

/** Pulls toward the cursor; fill sweeps up on hover. Renders a Link when `href` is set. */
export function MagneticButton({
  href,
  children,
  variant = "primary",
  className,
  strength = 0.35,
  type = "button",
  disabled,
  onClick,
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const inner = cn(
    "btn-sweep inline-flex h-12 items-center justify-center gap-3 rounded-full px-7 text-[13px] font-medium uppercase tracking-[0.18em] transition-colors duration-500 md:h-14 md:px-9",
    variants[variant],
    disabled && "pointer-events-none opacity-50",
    className,
  );

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className="inline-block"
    >
      {href ? (
        <Link href={href} className={inner} aria-label={rest["aria-label"]}>
          {children}
        </Link>
      ) : (
        <button type={type} className={inner} disabled={disabled} onClick={onClick} aria-label={rest["aria-label"]}>
          {children}
        </button>
      )}
    </motion.div>
  );
}
