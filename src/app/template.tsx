"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/ui/Logo";

// Becomes true after the first client mount; the server and first hydration never render the curtain.
let hasMounted = false;

/** Route transition: a black curtain with the Ø mark wipes up off the incoming page. Skipped on first load (preloader handles that). */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [isNavigation] = useState(() => typeof window !== "undefined" && hasMounted);
  useEffect(() => {
    hasMounted = true;
  }, []);
  const skip = !isNavigation || reduce;

  return (
    <>
      {skip ? null : (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-bg"
          initial={{ y: "0%" }}
          animate={{ y: "-100%" }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 1, scale: 1, rotate: 0 }}
            animate={{ opacity: 0, scale: 0.85, rotate: -45 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <LogoMark className="h-14 w-14 text-white" strokeWidth={5} />
          </motion.div>
        </motion.div>
      )}
      {children}
    </>
  );
}
