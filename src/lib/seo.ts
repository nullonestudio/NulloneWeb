import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "./site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Use the absolute title (skip the "%s | NullOne Solutions" template). */
  absoluteTitle?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  keywords?: string[];
};

/** Consistent per-page metadata: canonical, Open Graph and Twitter. OG images come from co-located opengraph-image files. */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
  type = "website",
  publishedTime,
  keywords,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: keywords ?? [...siteConfig.keywords],
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/logo.png"),
    description: siteConfig.description,
    foundingDate: String(siteConfig.foundingYear),
    sameAs: [siteConfig.social.linkedin],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.contact.phone.replace(/\s/g, ""),
        email: siteConfig.contact.email,
        contactType: "sales",
        areaServed: ["IN", "Worldwide"],
        availableLanguage: ["English", "Hindi"],
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "en-IN",
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export function professionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": absoluteUrl("/#business"),
    name: siteConfig.name,
    url: siteConfig.url,
    image: absoluteUrl("/opengraph-image"),
    logo: absoluteUrl("/logo.png"),
    telephone: siteConfig.contact.phone.replace(/\s/g, ""),
    email: siteConfig.contact.email,
    priceRange: "$$",
    address: { "@type": "PostalAddress", addressCountry: "IN" },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Place", name: "Worldwide" },
    ],
    parentOrganization: { "@id": absoluteUrl("/#organization") },
    knowsAbout: [...siteConfig.keywords],
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}
