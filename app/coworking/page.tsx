import Link from "next/link";
import { SiteChrome } from "../../components/site-chrome";

const coworkingHighlights = [
  {
    title: "Flexible desk plans",
    body: "Choose daily, weekly, or monthly access for solo professionals, founders, and lean teams."
  },
  {
    title: "Private cabins",
    body: "Upgrade from open seating to enclosed cabins whenever privacy and focus become more important."
  },
  {
    title: "Meeting-ready setup",
    body: "Present, call, and collaborate with access to reception support, internet, and meeting rooms."
  }
];

const coworkingBenefits = [
  {
    title: "Lower setup friction",
    body: "Start work faster without managing fit-outs, pantry setup, or day-one operational details."
  },
  {
    title: "Scale when needed",
    body: "Move from a few seats to a larger cluster as your hiring plan becomes clearer."
  },
  {
    title: "Business-friendly address",
    body: "Operate from accessible commercial locations that feel professional for clients and teams."
  }
];

export default function CoworkingPage() {
  return (
    <SiteChrome>
      <main className="page-content">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">Coworking</p>
            <h1>Flexible desks and cabins for modern teams</h1>
            <p className="hero-text">
              Explore coworking-style workspace solutions in Indore with a practical mix of
              flexibility, amenities, and professional day-to-day support.
            </p>

            <div className="hero-actions">
              <Link className="button" href="/contact">
                Book a Tour
              </Link>
              <Link className="button button-secondary" href="/properties">
                Explore Office Options
              </Link>
            </div>

            <div className="hero-micro-stats">
              <span>Hot desks to private cabins</span>
              <span>Meeting-ready spaces</span>
              <span>Flexible team sizing</span>
            </div>
          </div>

          <aside className="hero-panel">
            <div className="hero-panel-top">
              <div>
                <p className="eyebrow">What coworking covers</p>
                <h2>Everything teams need to get started quickly</h2>
              </div>
              <span className="pill">Flexible plans</span>
            </div>

            <div className="advantages-grid">
              {coworkingHighlights.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </aside>
        </section>

        <section className="advantages-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Why coworking works</p>
              <h2>Built for flexibility without losing professionalism</h2>
            </div>
          </div>

          <div className="advantages-grid">
            {coworkingBenefits.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
