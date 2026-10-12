import type { Metadata } from "next";
import { about } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { FadeIn, RevealText } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { LogoLockup } from "@/components/ui/Logo";
import { Brackets } from "@/components/ui/Brackets";
import { ServiceLine } from "@/components/ui/ServiceLine";
import { WhyUs } from "@/components/sections/WhyUs";
import { Stats } from "@/components/sections/Stats";
import { Team } from "@/components/sections/Team";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = pageMetadata({
  title: "About Us — The Tech Arm of NullOne",
  description:
    "Meet NullOne Solutions, the tech arm of the NullOne family: a senior software development agency in India building web, mobile, games, AR/VR and custom software.",
  path: "/about",
});

const values = [
  { title: "Plain language", body: "We explain trade-offs in words you'd use with your own team. If we can't explain it simply, we don't understand it well enough." },
  { title: "Open doors", body: "No gatekeeping. You get access to the code, the boards and the people doing the work — from day one." },
  { title: "On time, every time", body: "Fixed scopes, weekly milestones and honest updates the moment anything changes." },
  { title: "Craft over volume", body: "We take on fewer projects so each one gets senior attention and the polish it deserves." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About"
        title={about.heading}
        intro="NullOne Solutions is the tech arm of the NullOne family — a compact, senior team building software for tech companies and for businesses that have never written a line of code."
        crumbs={[{ name: "About", path: "/about" }]}
      />

      <section aria-labelledby="story-title" className="py-24 md:py-36">
        <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <FadeIn>
              <Brackets className="flex aspect-[5/3] items-center justify-center bg-surface p-8" size={22}>
                <LogoLockup size="lg" />
              </Brackets>
            </FadeIn>
            <ServiceLine className="mt-8" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionLabel index="01">Our story</SectionLabel>
            <RevealText id="story-title" text="Why “null”?" className="display-md mt-8" />
            <div className="mt-8 flex flex-col gap-6">
              <FadeIn>
                <p className="body-lg">
                  In software, <em>null</em> means “nothing here yet.” Every product starts that way — a blank file, an empty
                  database, an idea that only exists in someone&apos;s head. Our job is to take you from null to one: from
                  nothing to something real, shipped and in your customers&apos; hands.
                </p>
              </FadeIn>
              {about.body.map((p, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <p className="body-lg">{p}</p>
                </FadeIn>
              ))}
              <FadeIn>
                <p className="border-l border-white/40 pl-6 font-display text-xl text-white md:text-2xl">{about.tagline}</p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-title" className="border-t border-line py-24 md:py-36">
        <div className="container-x">
          <SectionLabel index="02">Values</SectionLabel>
          <RevealText id="values-title" text="How we work with you." className="display-md mt-8" />
          <ul className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <FadeIn as="li" key={v.title} delay={i * 100} className="bg-bg p-7 md:p-8">
                <p className="label text-muted-text">0{i + 1}</p>
                <h3 className="mt-8 font-display text-xl font-medium">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">{v.body}</p>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      <Stats />
      <WhyUs />
      <Team index="03" />
      <CTA />
    </>
  );
}
