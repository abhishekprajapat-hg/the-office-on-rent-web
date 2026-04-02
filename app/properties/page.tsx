import Link from "next/link";
import { PropertyPreviewGrid } from "../../components/property-preview-grid";
import { SiteChrome } from "../../components/site-chrome";
import { properties } from "../../data/properties";

const brochureCount = properties.filter((property) => property.brochureUrl).length;
const zoneCount = new Set(properties.map((property) => property.zone)).size;

export default function PropertiesPage() {
  return (
    <SiteChrome>
      <main className="page-content">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">Properties</p>
            <h1>Browse office options across Indore</h1>
            <p className="hero-text">
              Explore verified office listings, compare prime zones, and move from shortlist to site
              visit without jumping between multiple pages.
            </p>

            <div className="hero-actions">
              <Link className="button" href="/contact">
                Book a Visit
              </Link>
              <Link className="button button-secondary" href="/projects">
                View New Projects
              </Link>
            </div>

            <div className="hero-micro-stats">
              <span>{properties.length}+ curated listings</span>
              <span>{zoneCount} Indore micro-markets</span>
              <span>{brochureCount} brochure-ready options</span>
            </div>
          </div>

          <aside className="hero-panel">
            <div className="hero-panel-top">
              <div>
                <p className="eyebrow">What you can compare</p>
                <h2>Shortlist by location, type, and brochure readiness</h2>
              </div>
              <span className="pill">Verified inventory</span>
            </div>

            <div className="metrics-grid">
              <article>
                <strong>{properties.length}</strong>
                <span>Office options</span>
              </article>
              <article>
                <strong>{zoneCount}</strong>
                <span>Prime zones</span>
              </article>
              <article>
                <strong>{brochureCount}</strong>
                <span>Brochure links</span>
              </article>
            </div>
          </aside>
        </section>

        <PropertyPreviewGrid
          eyebrow="Property Catalogue"
          title="All office listings in one place"
          note={`Showing ${properties.length} public project listings.`}
          properties={properties}
          id="all-properties"
        />

        <section className="advantages-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Need help deciding?</p>
              <h2>Move from browsing to booking faster</h2>
            </div>
          </div>

          <div className="advantages-grid">
            <article>
              <h3>Compare corridors quickly</h3>
              <p>Use zones and project types to narrow down office options that actually fit your team.</p>
            </article>
            <article>
              <h3>Open brochures instantly</h3>
              <p>Where available, brochure links are surfaced directly from the property cards for faster evaluation.</p>
            </article>
            <article>
              <h3>Enquire with context</h3>
              <p>Each property routes straight to the contact page with its office already selected in the enquiry form.</p>
            </article>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
