import type { Metadata } from "next";
import { Globe, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { LinkedInIcon } from "@/components/ui/icons";
import { Brackets } from "@/components/ui/Brackets";
import { QrCode } from "@/components/ui/QrCode";
import { FAQ } from "@/components/sections/FAQ";

export const metadata: Metadata = pageMetadata({
  title: "Contact — Start a Project",
  description:
    "Tell us about your web, mobile, game, AR/VR or custom software project. Book a free consultation with NullOne Solutions — we reply within one business day.",
  path: "/contact",
});

const contacts = [
  { icon: Mail, label: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}`, name: "Email" },
  { icon: Phone, label: siteConfig.contact.phone, href: siteConfig.contact.phoneHref, name: "Phone" },
  // { icon: Globe, label: siteConfig.contact.website, href: siteConfig.url, name: "Website" },
  { icon: LinkedInIcon, label: siteConfig.contact.linkedin, href: siteConfig.social.linkedin, name: "LinkedIn" },
] as const;

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Contact"
        title="Let's build something real."
        intro="Share a few details and we'll set up a free 30-minute discovery call. No jargon, no pressure — just a clear plan."
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />
      <section aria-label="Contact form and details" className="py-20 md:py-32">
        <div className="container-x grid gap-20 lg:grid-cols-12 lg:gap-8">
          <div className="relative lg:col-span-7">
            <ContactForm />
          </div>
          <aside className="flex flex-col gap-12 lg:col-span-4 lg:col-start-9" aria-label="Contact details">
            <div>
              <h2 className="label">Reach us directly</h2>
              <ul className="mt-6 flex flex-col gap-4">
                {contacts.map(({ icon: Icon, label, href, name }) => (
                  <li key={name}>
                    <a
                      href={href}
                      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center gap-4 text-sm text-secondary transition-colors hover:text-white"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong group-hover:border-white">
                        <Icon className="h-4 w-4" strokeWidth={1.25} aria-hidden />
                      </span>
                      <span>
                        <span className="sr-only">{name}: </span>
                        {label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-line pt-10">
              <h2 className="label">What happens next</h2>
              <ol className="mt-6 flex flex-col gap-5 text-sm text-secondary">
                <li><span className="mr-3 text-white">01</span>We reply within one business day.</li>
                <li><span className="mr-3 text-white">02</span>A free 30-minute discovery call.</li>
                <li><span className="mr-3 text-white">03</span>A written plan with scope, timeline and price.</li>
              </ol>
            </div>
            <div className="flex items-center gap-6 border-t border-line pt-10">
              <Brackets className="p-3">
                <QrCode value={siteConfig.url} size={80} />
              </Brackets>
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-secondary">Scan to visit our website</p>
            </div>
          </aside>
        </div>
      </section>
      <FAQ index="02" />
    </>
  );
}
