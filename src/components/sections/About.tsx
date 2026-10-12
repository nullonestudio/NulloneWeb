import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { about } from "@/content/home";
import { FadeIn, RevealText } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Watermark } from "@/components/ui/Watermark";
import { LogoMark } from "@/components/ui/Logo";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden py-24 md:py-40">
      <Watermark className="-left-[18rem] top-10 h-[34rem] w-[34rem] md:-left-[22rem] md:h-[44rem] md:w-[44rem]" />
      <div className="container-x relative grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-3">
          <SectionLabel index="01">{about.label}</SectionLabel>
        </div>
        <div className="md:col-span-9">
          <RevealText id="about-title" text={about.heading} className="display-lg max-w-[18ch]" />
          <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-[auto_1fr] md:gap-14">
            <span aria-hidden className="hidden w-px bg-line md:block" />
            <div className="flex flex-col gap-6">
              {about.body.map((p, i) => (
                <FadeIn key={i} delay={i * 120}>
                  <p className="body-lg max-w-2xl">{p}</p>
                </FadeIn>
              ))}
              <FadeIn delay={260} className="mt-6 flex flex-col gap-8 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-center gap-4 font-display text-lg text-white md:text-xl">
                  <LogoMark className="h-6 w-6 text-white/70" />
                  {about.tagline}
                </p>
                <Link
                  href="/about"
                  className="group inline-flex shrink-0 items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-secondary transition-colors hover:text-white"
                >
                  More about us
                  <ArrowUpRight size={14} aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
