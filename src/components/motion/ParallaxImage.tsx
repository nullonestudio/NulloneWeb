"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Percentage of travel; image is scaled up to cover it. */
  strength?: number;
  /** Clip-path wipe reveal when scrolled into view. */
  reveal?: boolean;
};

/** next/image with scroll parallax and an optional clip-path wipe reveal (CSS, via RevealObserver). Image is in the SSR HTML. */
export function ParallaxImage({ src, alt, sizes, priority, className, strength = 10, reveal = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)} data-reveal={reveal ? "clip" : undefined}>
      <div className="clip-inner absolute inset-0">
        <motion.div className="absolute inset-[-12%]" style={reduce ? undefined : { y }}>
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
        </motion.div>
      </div>
    </div>
  );
}
