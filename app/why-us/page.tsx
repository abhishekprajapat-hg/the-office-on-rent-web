import Link from "next/link";
import { SiteChrome } from "../../components/site-chrome";
import { properties } from "../../data/properties";

const zoneCount = new Set(properties.map((property) => property.zone)).size;
const brochureCount = properties.filter((property) => property.brochureUrl).length;

const reasons = [
  {
    title: "Public project facts",
    body: "Names, locations, project types, and brochure links are mapped from publicly visible sources."
  },
  {
    title: "Cleaner shortlisting",
    body: "Listings are organized so teams can compare options faster instead of hunting through scattered pages."
  },
  {
    title: "Property-aware enquiry",
    body: "Every property can flow directly into the contact form with its context already attached."
  },
  {
    title: "Local market focus",
    body: "The site is tuned around Indore office corridors, not a generic marketplace experience."
  },
  {
    title: "Decision-friendly UX",
    body: "Brochure access, location details, and action buttons stay close to the information users need."
  },
  {
    title: "Clear next steps",
    body: "Whether the user is browsing, shortlisting, or ready to talk, there is a direct path forward."
  }
];

export default function WhyUsPage() {
  return (
    <SiteChrome>
      <main className="page-content">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">Why Us</p>
            <h1>Why teams use Office On Rent to shortlist faster</h1>
            <p className="hero-text">
              The experience is built to help office seekers move from discovery to enquiry with less
              friction, clearer comparisons, and a stronger sense of next step.
            </p>

            <div className="hero-actions">
              <Link className="button" href="/contact">
                Talk to Our Team
              </Link>
              <Link className="button button-secondary" href="/properties">
                Browse Listings
              </Link>
            </div>

            <div className="hero-micro-stats">
              <span>{properties.length}+ office listings</span>
              <span>{zoneCount} mapped locations</span>
              <span>{brochureCount} brochure-linked projects</span>
            </div>
          </div>

          <aside className="hero-panel">
            <div className="hero-panel-top">
              <div>
                <p className="eyebrow">The difference</p>
                <h2>A real-estate browsing flow shaped around action, not just aesthetics</h2>
              </div>
              <span className="pill">User-first flow</span>
            </div>

            <div className="metrics-grid">
              <article>
                <strong>{properties.length}</strong>
                <span>Listings surfaced</span>
              </article>
              <article>
                <strong>{zoneCount}</strong>
                <span>Zones covered</span>
              </article>
              <article>
                <strong>{brochureCount}</strong>
                <span>Brochure links</span>
              </article>
            </div>
          </aside>
        </section>

        <section className="advantages-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Core strengths</p>
              <h2>What makes the browsing experience more useful</h2>
            </div>
          </div>

          <div className="advantages-grid">
            {reasons.map((reason) => (
              <article key={reason.title}>
                <h3>{reason.title}</h3>
                <p>{reason.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
