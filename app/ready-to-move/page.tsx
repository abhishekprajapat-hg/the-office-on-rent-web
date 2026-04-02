import Link from "next/link";
import { PropertyPreviewGrid } from "../../components/property-preview-grid";
import { SiteChrome } from "../../components/site-chrome";
import { properties } from "../../data/properties";

const fastDecisionProperties = properties.filter((property) => property.brochureUrl).slice(0, 6);

export default function ReadyToMovePage() {
  return (
    <SiteChrome>
      <main className="page-content">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">Ready To Move</p>
            <h1>Fast-track your office move with a tighter shortlist</h1>
            <p className="hero-text">
              This page is focused on quick decision-making: brochure-backed options, faster site
              visit planning, and clearer handoff to our contact team when you are ready to move.
            </p>

            <div className="hero-actions">
              <Link className="button" href="/contact">
                Start Enquiry
              </Link>
              <a className="button button-secondary" href="https://wa.me/918602129377" target="_blank" rel="noreferrer">
                WhatsApp Us
              </a>
            </div>

            <div className="hero-micro-stats">
              <span>{fastDecisionProperties.length} brochure-backed picks</span>
              <span>Quick visit scheduling</span>
              <span>Shortlist-first workflow</span>
            </div>
          </div>

          <aside className="hero-panel">
            <div className="hero-panel-top">
              <div>
                <p className="eyebrow">Move-in support</p>
                <h2>Built for teams that want fewer delays between shortlist and tour</h2>
              </div>
              <span className="pill">Faster decisions</span>
            </div>

            <div className="advantages-grid">
              <article>
                <h3>Brochure-backed evaluation</h3>
                <p>Review project details sooner so your internal discussions start with better context.</p>
              </article>
              <article>
                <h3>Tour planning</h3>
                <p>Share team size and preferred dates once, then align site visits around your shortlist.</p>
              </article>
              <article>
                <h3>Direct follow-up</h3>
                <p>Use the contact page to move straight from research into the enquiry flow.</p>
              </article>
            </div>
          </aside>
        </section>

        <PropertyPreviewGrid
          eyebrow="Quick Shortlist"
          title="Office options suited for faster review"
          note={`Showing ${fastDecisionProperties.length} brochure-backed office options.`}
          properties={fastDecisionProperties}
        />
      </main>
    </SiteChrome>
  );
}
