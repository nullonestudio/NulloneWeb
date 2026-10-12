import { stats } from "@/content/stats";
import { CountUp } from "@/components/motion/CountUp";
import { FadeIn } from "@/components/motion/RevealText";

export function Stats() {
  return (
    <section aria-label="NullOne Solutions in numbers" className="relative border-t border-line">
      <div className="container-x">
        <dl className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
          {stats.map((s, i) => (
            <FadeIn
              key={s.label}
              delay={i * 100}
              className="flex flex-col-reverse gap-3 bg-bg px-4 py-12 md:px-10 md:py-20"
            >
              <dt className="label">{s.label}</dt>
              <dd className="font-display text-5xl font-light tracking-tight md:text-7xl xl:text-8xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </dd>
            </FadeIn>
          ))}
        </dl>
      </div>
    </section>
  );
}
