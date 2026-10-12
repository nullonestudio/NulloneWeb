import { processSteps } from "@/content/home";
import { RevealText, FadeIn } from "@/components/motion/RevealText";
import { ProcessTimeline } from "@/components/motion/ProcessTimeline";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="relative border-t border-line py-24 md:py-40">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="flex flex-col gap-8 lg:sticky lg:top-32">
            <SectionLabel index="05">Process</SectionLabel>
            <RevealText id="process-title" text="Three steps from idea to shipped." className="display-lg max-w-[12ch]" />
            <FadeIn>
              <p className="body-lg max-w-md">
                A simple, transparent process with no surprises. You always know what&apos;s being built, why, and when it lands.
              </p>
            </FadeIn>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ProcessTimeline>
            <span aria-hidden className="absolute bottom-0 left-[11px] top-0 w-px bg-line" />
            <span aria-hidden data-line className="absolute bottom-0 left-[11px] top-0 w-px bg-white" />
            <ol className="relative flex flex-col gap-20 md:gap-28">
              {processSteps.map((step) => (
                <li key={step.number} data-step className="relative grid grid-cols-[24px_1fr] gap-8 md:gap-12">
                  <span aria-hidden className="relative mt-3 flex h-6 w-6 items-center justify-center rounded-full border border-line-strong bg-bg">
                    <span className="step-dot h-2 w-2 rounded-full bg-white" />
                  </span>
                  <div>
                    <p className="font-display text-6xl font-light tracking-tight text-white/90 md:text-8xl">{step.number}</p>
                    <h3 className="mt-6 font-display text-2xl font-medium tracking-tight md:text-3xl">{step.title}</h3>
                    <p className="mt-4 max-w-md text-[15px] leading-relaxed text-secondary">{step.description}</p>
                    <p className="label mt-6 text-muted-text">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </ProcessTimeline>
        </div>
      </div>
    </section>
  );
}
