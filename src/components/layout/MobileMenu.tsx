"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { navLinks, siteConfig } from "@/lib/site";
import { useLenis } from "@/components/motion/SmoothScroll";
import { Watermark } from "@/components/ui/Watermark";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const lenis = useLenis();

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, lenis, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[55] overflow-hidden bg-bg lg:hidden"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <Watermark className="-bottom-24 -right-32 h-[30rem] w-[30rem]" />
          <nav aria-label="Mobile" className="container-x flex h-full flex-col justify-between pb-10 pt-28">
            <ul className="flex flex-col gap-1">
              {navLinks.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.8, delay: 0.25 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={l.href}
                      onClick={onClose}
                      className="flex items-baseline gap-4 py-1.5 font-display text-4xl font-medium tracking-tight sm:text-5xl"
                    >
                      <span className="label text-muted-text">0{i + 1}</span>
                      {l.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-6"
            >
              <Link
                href="/contact"
                onClick={onClose}
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white text-[13px] font-medium uppercase tracking-[0.18em] text-black"
              >
                Start a Project
              </Link>
              <div className="flex flex-col gap-1 text-sm text-secondary">
                <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
                <a href={siteConfig.contact.phoneHref}>{siteConfig.contact.phone}</a>
              </div>
            </motion.div>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
