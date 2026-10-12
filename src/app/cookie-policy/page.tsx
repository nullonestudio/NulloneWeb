import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy",
  description: "NullOne Solutions uses no advertising or tracking cookies. Learn what minimal browser storage our website uses and why.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      path="/cookie-policy"
      updated="October 2026"
      intro="Short version: we don't use advertising or cross-site tracking cookies, so there's no cookie banner to dismiss."
      sections={[
        {
          heading: "What we use",
          body: (
            <ul>
              <li>
                <strong>Session storage</strong> — a single <code>nullone:preloaded</code> flag so the intro animation only plays once per
                visit. It is deleted when you close the tab.
              </li>
              <li>
                <strong>Vercel Web Analytics &amp; Speed Insights</strong> — privacy-friendly, cookieless measurement of page views and
                performance.
              </li>
            </ul>
          ),
        },
        {
          heading: "What we don't use",
          body: <p>No advertising cookies, no social-media tracking pixels and no data brokers.</p>,
        },
        {
          heading: "Managing storage",
          body: <p>You can clear session storage at any time through your browser settings; the website will continue to work normally.</p>,
        },
        {
          heading: "Contact",
          body: (
            <p>
              Questions? Email <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
