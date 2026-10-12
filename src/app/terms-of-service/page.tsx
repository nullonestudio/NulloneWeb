import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: "Terms governing use of the NullOne Solutions website, including intellectual property, acceptable use, liability and governing law.",
  path: "/terms-of-service",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      path="/terms-of-service"
      updated="October 2026"
      intro="These terms govern your use of this website. Client projects are covered by a separate written agreement."
      sections={[
        {
          heading: "Acceptance",
          body: <p>By accessing {siteConfig.contact.website} you agree to these terms. If you do not agree, please do not use the website.</p>,
        },
        {
          heading: "Use of the website",
          body: (
            <p>
              You may browse and share our content for personal and business evaluation purposes. You must not misuse the website, attempt to
              gain unauthorised access, disrupt its operation or submit unlawful or misleading information through our forms.
            </p>
          ),
        },
        {
          heading: "Intellectual property",
          body: (
            <p>
              The NullOne name, Ø logo, website design, text and graphics are owned by {siteConfig.name} unless stated otherwise. Case-study
              material is shown with client permission and remains the property of the respective owners.
            </p>
          ),
        },
        {
          heading: "Project engagements",
          body: (
            <p>
              Proposals, estimates and information on this website are not binding offers. Every engagement is governed by a signed statement
              of work or services agreement, which takes precedence over these terms.
            </p>
          ),
        },
        {
          heading: "Disclaimer and liability",
          body: (
            <p>
              Website content is provided &ldquo;as is&rdquo; for general information. To the extent permitted by law, we are not liable for any
              indirect or consequential loss arising from use of the website.
            </p>
          ),
        },
        {
          heading: "Third-party links",
          body: <p>We are not responsible for the content or practices of external websites linked from ours.</p>,
        },
        {
          heading: "Governing law",
          body: <p>These terms are governed by the laws of India, and disputes are subject to the jurisdiction of the courts of India.</p>,
        },
        {
          heading: "Contact",
          body: (
            <p>
              Questions about these terms? Email <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
