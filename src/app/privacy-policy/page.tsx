import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How NullOne Solutions collects, uses and protects personal data submitted through our website, contact form and newsletter.",
  path: "/privacy-policy",
});

const email = siteConfig.contact.email;

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy"
      updated="October 2026"
      intro="We collect as little personal data as possible, use it only to respond to you and improve our website, and never sell it."
      sections={[
        {
          heading: "Who we are",
          body: (
            <p>
              {siteConfig.name} (&ldquo;NullOne&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a software development agency based in India and the data
              controller for personal data collected through {siteConfig.contact.website}. You can contact us at <a href={`mailto:${email}`}>{email}</a>.
            </p>
          ),
        },
        {
          heading: "Data we collect",
          body: (
            <ul>
              <li><strong>Contact form:</strong> name, email, company, the service and budget range you select, and your message.</li>
              <li><strong>Newsletter:</strong> your email address.</li>
              <li><strong>Analytics:</strong> anonymous, aggregated usage data (pages viewed, device type, country, performance metrics) via Vercel Web Analytics and Speed Insights, which do not use cookies.</li>
            </ul>
          ),
        },
        {
          heading: "How we use it",
          body: (
            <ul>
              <li>To reply to enquiries and prepare proposals (legitimate interest / steps prior to a contract).</li>
              <li>To send our newsletter if you subscribe (consent — unsubscribe at any time).</li>
              <li>To understand and improve website performance (legitimate interest).</li>
            </ul>
          ),
        },
        {
          heading: "Processors and sharing",
          body: (
            <p>
              We use Vercel (hosting and analytics) and Resend (email delivery) to operate this website. They process data on our behalf
              under their own data-protection terms. We do not sell or rent personal data and only disclose it if required by law.
            </p>
          ),
        },
        {
          heading: "Retention",
          body: <p>Enquiries are kept for up to 24 months unless they lead to a project. Newsletter data is kept until you unsubscribe.</p>,
        },
        {
          heading: "Your rights",
          body: (
            <p>
              Under India&apos;s Digital Personal Data Protection Act, 2023 and, where applicable, the GDPR, you may request access to,
              correction of or deletion of your personal data, and withdraw consent at any time. Email <a href={`mailto:${email}`}>{email}</a> and we will
              respond within 30 days.
            </p>
          ),
        },
        {
          heading: "Security",
          body: <p>Data is transmitted over HTTPS and stored with providers that use encryption at rest and strict access controls.</p>,
        },
        {
          heading: "Changes",
          body: <p>We may update this policy from time to time. The &ldquo;last updated&rdquo; date above shows the latest revision.</p>,
        },
      ]}
    />
  );
}
