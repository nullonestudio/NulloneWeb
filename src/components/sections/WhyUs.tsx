import { Check, Minus } from "lucide-react";
import { whyUs } from "@/content/home";
import { FadeIn, RevealText } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { LogoMark } from "@/components/ui/Logo";
import { Brackets } from "@/components/ui/Brackets";

export function WhyUs() {
  return (
    <section id="why-us" aria-labelledby="why-title" className="relative border-t border-line py-24 md:py-40">
      <div className="container-x">
        <div className="flex flex-col gap-8">
          <SectionLabel index="04">Why Us</SectionLabel>
          <RevealText id="why-title" text={whyUs.heading} className="display-lg max-w-[16ch]" />
        </div>

        <div className="mt-16 grid gap-6 md:mt-24 md:grid-cols-2 md:gap-0">
          <FadeIn className="border border-line p-7 md:border-r-0 md:p-12">
            <h3 className="flex items-center gap-3 font-display text-xl text-secondary md:text-2xl">{whyUs.typical.title}</h3>
            <ul className="mt-10 flex flex-col">
              {whyUs.typical.points.map((p) => (
                <li key={p} className="flex items-start gap-4 border-t border-line py-5 text-secondary">
                  <Minus size={16} className="mt-1 shrink-0 text-muted" aria-hidden />
                  <span className="text-[15px] leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={150}>
            <Brackets className="h-full bg-surface p-7 md:p-12" size={20}>
              <h3 className="flex items-center gap-3 font-display text-xl md:text-2xl">
                <LogoMark className="h-6 w-6" />
                {whyUs.nullone.title}
              </h3>
              <ul className="mt-10 flex flex-col">
                {whyUs.nullone.points.map((p) => (
                  <li key={p} className="flex items-start gap-4 border-t border-line py-5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-black">
                      <Check size={12} strokeWidth={2.5} aria-hidden />
                    </span>
                    <span className="text-[15px] leading-relaxed text-white">{p}</span>
                  </li>
                ))}
              </ul>
            </Brackets>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
