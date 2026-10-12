import { ArrowDown, ArrowUpRight } from "lucide-react";
import { hero } from "@/content/home";
import { RevealText, FadeIn } from "@/components/motion/RevealText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ServiceLine } from "@/components/ui/ServiceLine";
import { Watermark } from "@/components/ui/Watermark";
import { HeroParticlesLoader } from "@/components/three/HeroParticlesLoader";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <HeroParticlesLoader />
      <Watermark spin className="-right-[30%] top-1/2 h-[46rem] w-[46rem] -translate-y-1/2 md:-right-[14%] md:h-[60rem] md:w-[60rem]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      <div className="container-x relative flex flex-1 flex-col justify-center pb-16 pt-32 md:pb-24 md:pt-40">
        <FadeIn className="mb-8 md:mb-10">
          <p className="label flex flex-col gap-4">
            <span aria-hidden className="hairline" />
            {hero.eyebrow}
          </p>
        </FadeIn>

        <RevealText as="h1" id="hero-title" text={hero.headline} className="display-xl max-w-[14ch]" delay={150} />

        <FadeIn delay={650} className="mt-8 max-w-xl md:mt-10">
          <p className="body-lg">{hero.sub}</p>
        </FadeIn>

        <FadeIn delay={800} className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton href={hero.primaryCta.href}>
            {hero.primaryCta.label}
            <ArrowUpRight size={16} aria-hidden />
          </MagneticButton>
          <MagneticButton href={hero.secondaryCta.href} variant="outline">
            {hero.secondaryCta.label}
          </MagneticButton>
        </FadeIn>
      </div>

      <div className="container-x relative flex items-end justify-between gap-6 border-t border-line py-6">
        <FadeIn delay={950}>
          <ServiceLine />
        </FadeIn>
        <a
          href="#about"
          className="hidden shrink-0 items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-secondary transition-colors hover:text-white md:flex"
        >
          Scroll
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong">
            <ArrowDown size={14} aria-hidden className="motion-safe:animate-bounce" />
          </span>
        </a>
      </div>
    </section>
  );
}
