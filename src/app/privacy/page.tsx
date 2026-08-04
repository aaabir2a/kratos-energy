import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/sections/PageHero";
import { CompanySeal } from "@/components/ui/CompanySeal";

const PRIVACY_EMAIL = "nessarkhan@kratos-energy.com";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Kratos Energy Pty Ltd collects, uses, stores and discloses your personal information under the Privacy Act 1988 (Cth) and the Australian Privacy Principles.",
  alternates: { canonical: "/privacy" },
};

type Section = { id: string; heading: string; body: React.ReactNode };

const SECTIONS: Section[] = [
  {
    id: "what-we-collect",
    heading: "1. What information do we collect and primary purpose?",
    body: (
      <>
        <p>
          The kind of Personal Information that we collect from you will depend
          on how you use the website. The Personal Information which we collect
          and hold about you may include:
        </p>
        <p>
          We may collect personal information from social media, website or
          third party that includes full name, email address, phone number,
          residential and installation address, billing and payment details,
          energy usage and consumption data, property details relevant to solar
          and battery installation quotes, and any other information voluntarily
          provided through enquiry forms, quote requests, or customer service
          communications. This is considered to be our primary purpose.
        </p>
      </>
    ),
  },
  {
    id: "types-of-information",
    heading: "2. Types of information",
    body: (
      <>
        <p>
          The <em>Privacy Act 1988</em> (Cth) (Privacy Act) defines types of
          information, including Personal Information and Sensitive Information.
        </p>
        <p>
          <strong>Personal Information</strong> means information or an opinion
          about an identified individual or an individual who is reasonably
          identifiable:
        </p>
        <ol className="ke-legal-list">
          <li>whether the information or opinion is true or not; and</li>
          <li>
            whether the information or opinion is recorded in a material form or
            not.
          </li>
        </ol>
        <p>
          If the information does not disclose your identity or enable your
          identity to be ascertained, it will in most cases not be classified as
          &ldquo;Personal Information&rdquo; and will not be subject to this
          privacy policy.
        </p>
        <p>
          <strong>Sensitive Information</strong> is defined in the Privacy Act as
          including information or opinion about such things as an
          individual&rsquo;s racial or ethnic origin, political opinions,
          membership of a political association, religious or philosophical
          beliefs, membership of a trade union or other professional body,
          criminal record or health information.
        </p>
        <p>Sensitive Information will be used by us only:</p>
        <ol className="ke-legal-list">
          <li>for the primary purpose for which it was obtained;</li>
          <li>
            for a secondary purpose that is directly related to the primary
            purpose; and
          </li>
          <li>
            with your consent or where required or authorised by law.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: "how-we-collect",
    heading: "3. How we collect your Personal Information",
    body: (
      <ol className="ke-legal-list">
        <li>
          We may collect Personal Information from you whenever you input such
          information into the Website, social media pages or related app, or
          provide it to us in any other way.
        </li>
        <li>
          We may also collect cookies from your computer which enable us to tell
          when you use the Website and to help customise your website
          experience. Generally, cookies do not allow us to identify you
          personally.
        </li>
        <li>
          We generally don&rsquo;t collect Sensitive Information, but when we do,
          we will comply with the preceding paragraph.
        </li>
        <li>
          Where reasonable and practicable we collect your Personal Information
          from you only. However, sometimes we may be given information from a
          third party — in cases like this we only disclose information to our
          sales and marketing team within Australia.
        </li>
      </ol>
    ),
  },
  {
    id: "purpose-of-collection",
    heading: "4. Purpose of collection",
    body: (
      <ol className="ke-legal-list">
        <li>
          We collect Personal Information to provide you with the best service
          experience possible on the Website, social media pages or through third
          party, and stay connected with you about developments in our business.
        </li>
        <li>
          We customarily only disclose Personal Information to our own sales and
          marketing team for follow up and interaction for onboarding as our
          customers and no other purpose.
        </li>
        <li>
          By using our website and social media page, you consent to the receipt
          of direct marketing material. We will only use your Personal
          Information for this purpose if we have collected such information
          direct from you, and if it is material of a type which you would
          reasonably expect to receive from us. We do not use sensitive Personal
          Information in direct marketing activity. Our direct marketing material
          will include a simple means by which you can request not to receive
          further communications of this nature, such as an unsubscribe button
          link.
        </li>
      </ol>
    ),
  },
  {
    id: "security-access-correction",
    heading: "5. Security, access and correction",
    body: (
      <ol className="ke-legal-list">
        <li>
          We store your Personal Information in a way that reasonably protects it
          from unauthorised access, misuse, modification or disclosure. When we
          no longer require your Personal Information for the purpose for which
          we obtained it, we will take reasonable steps to destroy and anonymise
          or de-identify it. Most of the Personal Information that is stored in
          our client files and records will be kept for a maximum of 7 years.
        </li>
        <li>
          The Australian Privacy Principles:
          <ol className="ke-legal-list ke-legal-list--roman">
            <li>
              permit you to obtain access to the Personal Information we hold
              about you in certain circumstances (Australian Privacy Principle
              12); and
            </li>
            <li>
              allow you to correct inaccurate Personal Information subject to
              certain exceptions (Australian Privacy Principle 13).
            </li>
          </ol>
        </li>
        <li>
          Where you would like to obtain such access, please contact us in
          writing on the contact details set out at the bottom of this privacy
          policy.
        </li>
      </ol>
    ),
  },
  {
    id: "complaints",
    heading: "6. Complaint procedure",
    body: (
      <p>
        If you have a complaint concerning the way we maintain the privacy of
        your Personal Information, please contact us on the contact details set
        out at the bottom of this policy. All complaints will be considered by
        Nessar Khan, and we may seek further information from you to clarify your
        concerns. If we agree that your complaint is well founded, we will, in
        consultation with you, take appropriate steps to rectify the problem. If
        you remain dissatisfied with the outcome, you may refer the matter to the
        Office of the Australian Information Commissioner.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "7. How to contact us about privacy",
    body: (
      <p>
        If you have any queries, or if you seek access to your Personal
        Information, or if you have a complaint about our privacy practices, you
        can contact us through:{" "}
        <a
          href={`mailto:${PRIVACY_EMAIL}`}
          className="font-semibold text-green-600 underline underline-offset-2 hover:text-green-700"
        >
          {PRIVACY_EMAIL}
        </a>
        .
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Legal"
        media={
          <CompanySeal className="mx-auto h-[132px] w-auto text-forest-900/85" />
        }
        title={
          <>
            Privacy <span className="text-green-600">Policy</span>
          </>
        }
        subtitle="This Privacy Policy applies to all personal information collected by Kratos Energy Pty Ltd, via social media, or the website www.kratos-energy.com, or by third party."
      />

      <section className="bg-white py-14 sm:py-[72px]">
        <div className="container-ke max-w-[820px]">
          {/* Contents */}
          <nav
            aria-label="On this page"
            className="mb-10 rounded-lg border border-ash-200 bg-paper p-6"
          >
            <div className="mb-3 font-display text-[13px] font-bold uppercase tracking-[0.05em] text-ash-500">
              On this page
            </div>
            <ol className="flex flex-col gap-2">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="font-body text-[15px] text-ash-700 underline-offset-2 hover:text-green-600 hover:underline"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex flex-col gap-10">
            {SECTIONS.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-28">
                <h2 className="font-display text-[clamp(20px,2.2vw,26px)] font-extrabold tracking-[-0.015em] text-navy-700">
                  {s.heading}
                </h2>
                <div className="ke-legal mt-3 flex flex-col gap-3 font-body text-[15.5px] leading-relaxed text-ash-700">
                  {s.body}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
