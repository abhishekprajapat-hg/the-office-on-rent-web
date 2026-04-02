import Link from "next/link";
import { SiteChrome } from "../../components/site-chrome";
import { properties } from "../../data/properties";

const featuredPosts = [
  {
    category: "Workspace Strategy",
    title: "How to shortlist office space in Indore without wasting site visits",
    excerpt:
      "A practical way to compare location, project type, brochure availability, and decision timing before your team books a tour.",
    ctaLabel: "Explore Properties",
    ctaHref: "/properties"
  },
  {
    category: "Coworking Guide",
    title: "When a coworking setup makes more sense than a traditional office",
    excerpt:
      "For lean teams and fast-moving startups, flexible desks and cabins can reduce setup friction while keeping the business address professional.",
    ctaLabel: "View Coworking",
    ctaHref: "/coworking"
  },
  {
    category: "Move-In Planning",
    title: "What to ask before choosing a ready-to-move office",
    excerpt:
      "Availability, access, amenities, and move-in expectations should be clarified early so shortlist discussions stay grounded in real constraints.",
    ctaLabel: "See Ready To Move",
    ctaHref: "/ready-to-move"
  }
] as const;

const blogTopics = [
  {
    title: "Location planning",
    body: "Compare MR 10, Super Corridor, Vijay Nagar, and highway-linked office pockets with more clarity."
  },
  {
    title: "Brochure-first evaluation",
    body: "Use brochure-backed listings to speed up internal reviews and reduce uncertainty before tours."
  },
  {
    title: "Team-size thinking",
    body: "Match space decisions to current headcount, near-term hiring, and preferred work setup."
  }
] as const;

const resourceNotes = [
  {
    title: "For founders",
    body: "Fast guidance for choosing a first serious office address without overcommitting too early."
  },
  {
    title: "For operations teams",
    body: "A cleaner shortlist workflow for comparing space types, amenities, and visit planning."
  },
  {
    title: "For growing businesses",
    body: "Useful when your next move depends on better access, more professionalism, or faster occupancy."
  }
] as const;

export default function BlogPage() {
  return (
    <SiteChrome>
      <main className="page-content">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">Blog</p>
            <h1>Insights for smarter office decisions in Indore</h1>
            <p className="hero-text">
              Read practical guidance on shortlisting office space, comparing workspace formats, and
              planning your next move with more confidence.
            </p>

            <div className="hero-actions">
              <Link className="button" href="/properties">
                Browse Listings
              </Link>
              <Link className="button button-secondary" href="/contact">
                Talk to Our Team
              </Link>
            </div>

            <div className="hero-micro-stats">
              <span>{properties.length}+ active office listings</span>
              <span>Guides for search and move-in planning</span>
              <span>Practical tips, not generic advice</span>
            </div>
          </div>

          <aside className="hero-panel">
            <div className="hero-panel-top">
              <div>
                <p className="eyebrow">Editorial focus</p>
                <h2>Useful reading for teams that want better shortlists</h2>
              </div>
              <span className="pill">Fresh guidance</span>
            </div>

            <div className="advantages-grid">
              {blogTopics.map((topic) => (
                <article key={topic.title}>
                  <h3>{topic.title}</h3>
                  <p>{topic.body}</p>
                </article>
              ))}
            </div>
          </aside>
        </section>

        <section className="advantages-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Featured Reads</p>
              <h2>Start with the questions teams usually ask first</h2>
            </div>
          </div>

          <div className="story-grid">
            {featuredPosts.map((post) => (
              <article className="story-card" key={post.title}>
                <span className="story-card-meta">{post.category}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <Link className="story-card-link" href={post.ctaHref}>
                  {post.ctaLabel}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="advantages-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Who this helps</p>
              <h2>Built for real workspace decisions, not filler content</h2>
            </div>
          </div>

          <div className="advantages-grid">
            {resourceNotes.map((note) => (
              <article key={note.title}>
                <h3>{note.title}</h3>
                <p>{note.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
