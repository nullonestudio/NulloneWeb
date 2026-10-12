import { ArrowUpRight } from "lucide-react";
import { cta } from "@/content/home";
import { RevealText, FadeIn } from "@/components/motion/RevealText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Watermark } from "@/components/ui/Watermark";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function CTA({ heading = cta.heading, sub = cta.sub }: { heading?: string; sub?: string }) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-t border-line py-28 md:py-48">
      <Watermark spin className="left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 md:h-[64rem] md:w-[64rem]" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-[120px]" />
      <div className="container-x relative flex flex-col items-center text-center">
        <SectionLabel className="items-center">Let&apos;s talk</SectionLabel>
        <RevealText id="cta-title" text={heading} className="display-xl mt-10 max-w-[16ch]" />
        <FadeIn delay={300} className="mt-8 max-w-xl">
          <p className="body-lg">{sub}</p>
        </FadeIn>
        <FadeIn delay={450} className="mt-12">
          <MagneticButton href={cta.button.href} strength={0.45}>
            {cta.button.label}
            <ArrowUpRight size={16} aria-hidden />
          </MagneticButton>
        </FadeIn>
      </div>
    </section>
  );
}
