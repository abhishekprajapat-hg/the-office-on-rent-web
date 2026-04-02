import Link from "next/link";
import { PropertyPreviewGrid } from "../../components/property-preview-grid";
import { SiteChrome } from "../../components/site-chrome";
import { properties } from "../../data/properties";

const commercialProjects = properties.filter((property) => property.type === "Commercial Project");
const brochureCount = commercialProjects.filter((property) => property.brochureUrl).length;

export default function ProjectsPage() {
  return (
    <SiteChrome>
      <main className="page-content">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">New Commercial Projects</p>
            <h1>Track fresh commercial supply in Indore</h1>
            <p className="hero-text">
              Browse commercial projects that help growing teams compare brochure-backed options,
              access main-road corridors, and start conversations sooner.
            </p>

            <div className="hero-actions">
              <Link className="button" href="/contact">
                Discuss a Project
              </Link>
              <Link className="button button-secondary" href="/properties">
                See All Properties
              </Link>
            </div>

            <div className="hero-micro-stats">
              <span>{commercialProjects.length} commercial listings</span>
              <span>{brochureCount} brochure-backed projects</span>
              <span>MR 10 and Super Corridor coverage</span>
            </div>
          </div>

          <aside className="hero-panel">
            <div className="hero-panel-top">
              <div>
                <p className="eyebrow">Why this page</p>
                <h2>Built for teams comparing upcoming office destinations</h2>
              </div>
              <span className="pill">Project watchlist</span>
            </div>

            <div className="advantages-grid">
              <article>
                <h3>Main-road access</h3>
                <p>Discover projects in high-visibility business corridors where connectivity matters.</p>
              </article>
              <article>
                <h3>Brochure-first review</h3>
                <p>Focus on brochure-ready options when your team needs faster internal approvals.</p>
              </article>
              <article>
                <h3>Simple next step</h3>
                <p>Jump from any card into the enquiry form with the project already preselected.</p>
              </article>
            </div>
          </aside>
        </section>

        <PropertyPreviewGrid
          eyebrow="Commercial Projects"
          title="Current commercial project shortlist"
          note={`Showing ${commercialProjects.length} commercial project listings.`}
          properties={commercialProjects}
        />
      </main>
    </SiteChrome>
  );
}
