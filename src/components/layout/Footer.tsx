import Link from "next/link";
import { Globe, Mail, Phone } from "lucide-react";
import { footerLinks, siteConfig } from "@/lib/site";
import { LogoLockup } from "@/components/ui/Logo";
import { Brackets } from "@/components/ui/Brackets";
import { LinkedInIcon } from "@/components/ui/icons";
import { QrCode } from "@/components/ui/QrCode";
import { Watermark } from "@/components/ui/Watermark";
import { ServiceLine } from "@/components/ui/ServiceLine";
import { Newsletter } from "./Newsletter";

const contacts = [
  { icon: Phone, label: siteConfig.contact.phone, href: siteConfig.contact.phoneHref, aria: "Call us" },
  { icon: Mail, label: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}`, aria: "Email us" },
  { icon: Globe, label: siteConfig.contact.website, href: siteConfig.url, aria: "Website" },
  { icon: LinkedInIcon, label: siteConfig.contact.linkedin, href: siteConfig.social.linkedin, aria: "LinkedIn" },
] as const;

/** Styled like the back of the business card. */
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg">
      <Watermark className="-bottom-[30%] -right-[12%] h-[38rem] w-[38rem] md:h-[52rem] md:w-[52rem]" />

      <div className="container-x relative pt-20 md:pt-28">
        {/* Card back: lockup | contacts | QR */}
        <div className="grid gap-12 border-b border-line pb-16 md:grid-cols-[1.2fr_auto_1fr_auto] md:items-center md:gap-10 lg:gap-16">
          <div className="flex flex-col gap-6">
            <Link href="/" aria-label="NullOne Solutions — home" className="w-fit">
              <LogoLockup size="md" />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-secondary">{siteConfig.tagline}</p>
            <p className="label flex flex-col gap-3">
              <span aria-hidden className="hairline" />
              {siteConfig.label}
            </p>
          </div>

          <span aria-hidden className="hidden h-40 w-px bg-line md:block" />

          <address className="not-italic">
            <ul className="flex flex-col gap-4">
              {contacts.map(({ icon: Icon, label, href, aria }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={`${aria}: ${label}`}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-4 text-sm text-secondary transition-colors hover:text-white"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-strong transition-colors group-hover:border-white">
                      <Icon className="h-4 w-4" strokeWidth={1.25} aria-hidden />
                    </span>
                    <span className="break-all">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </address>

          <div className="flex flex-col items-start gap-4 md:items-center">
            <Brackets className="p-4" size={16}>
              <QrCode value={siteConfig.url} />
            </Brackets>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-secondary">Scan to visit our website</p>
          </div>
        </div>

        {/* Links + newsletter */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <Newsletter />
          {Object.entries(footerLinks).map(([group, links]) => (
            <nav key={group} aria-label={`${group} links`}>
              <p className="label mb-5">{group}</p>
              <ul className="flex flex-col gap-3">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-secondary transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-6 border-t border-line py-8 md:flex-row md:items-center md:justify-between">
          <ServiceLine className="text-[10px] sm:text-[11px]" />
          <p className="text-xs text-muted-text">
            © {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
