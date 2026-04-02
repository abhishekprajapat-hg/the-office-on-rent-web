import Link from "next/link";
import { SiteChrome } from "../../components/site-chrome";

const privacySections = [
  {
    title: "Information we collect",
    points: [
      "When you fill out the enquiry form, we may collect your name, work email, company name, team size, preferred property, visit date, and visit type.",
      "The site may also store the latest enquiry in your browser so the booking experience feels complete during repeat visits."
    ]
  },
  {
    title: "How we use your information",
    points: [
      "The information you submit is used to understand your workspace requirement, coordinate follow-up, and help connect you with relevant office options.",
      "We may use enquiry details to support guided tours, project discussions, and workspace planning conversations."
    ]
  },
  {
    title: "Cookies and local storage",
    points: [
      "This demo experience uses browser storage to remember the latest enquiry locally on your device.",
      "That saved information is meant to improve continuity in the form flow and is not a substitute for a full production privacy setup."
    ]
  },
  {
    title: "Sharing and security",
    points: [
      "We do not frame this demo as a public data marketplace, and submitted details should only be used for office-related communication and internal handling.",
      "Reasonable care should be taken to protect submitted data, limit unnecessary access, and keep enquiry handling focused on legitimate business purposes."
    ]
  },
  {
    title: "Your choices",
    points: [
      "You may choose not to submit an enquiry form if you do not want to share contact details.",
      "For privacy-related questions or corrections, you can reach out directly through the contact options listed on the website."
    ]
  }
] as const;

export default function PrivacyPolicyPage() {
  return (
    <SiteChrome>
      <main className="page-content">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">Privacy Policy</p>
            <h1>How enquiry information is handled on this website</h1>
            <p className="hero-text">
              This page explains the type of information the site may collect, how it may be used in
              the enquiry flow, and what visitors should expect from this demo experience.
            </p>

            <div className="hero-highlight-list">
              <span>Last updated: April 2, 2026</span>
              <span>Applies to this website experience</span>
            </div>

            <div className="hero-actions">
              <Link className="button" href="/contact">
                Contact Us
              </Link>
              <Link className="button button-secondary" href="/blog">
                Read Blog
              </Link>
            </div>
          </div>

          <aside className="hero-panel">
            <div className="hero-panel-top">
              <div>
                <p className="eyebrow">Quick summary</p>
                <h2>Form details are used to support office enquiries and improve continuity</h2>
              </div>
              <span className="pill">Policy overview</span>
            </div>

            <div className="metrics-grid">
              <article>
                <strong>Enquiry data</strong>
                <span>Name, email, company, property and visit preferences</span>
              </article>
              <article>
                <strong>Browser storage</strong>
                <span>Latest enquiry may be saved locally on your device</span>
              </article>
              <article>
                <strong>Support</strong>
                <span>Questions can be raised through the site contact details</span>
              </article>
            </div>
          </aside>
        </section>

        <section className="advantages-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Policy Sections</p>
              <h2>Privacy details in a readable format</h2>
            </div>
          </div>

          <div className="policy-grid">
            {privacySections.map((section) => (
              <article className="policy-card" key={section.title}>
                <h3>{section.title}</h3>
                <ul className="policy-list">
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
