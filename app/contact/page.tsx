import { ContactBookingSection } from "../../components/contact-booking-section";
import { SiteChrome } from "../../components/site-chrome";

const contactCards = [
  {
    title: "Call us",
    body: "+91 86021 29377",
    href: "tel:+918602129377"
  },
  {
    title: "WhatsApp",
    body: "Quick chat for office requirements and visit coordination.",
    href: "https://wa.me/918602129377"
  },
  {
    title: "Visit us",
    body: "Gravity Mall, Plot-27, Mechanic Nagar, Scheme No 54, Indore, Madhya Pradesh 452011"
  }
];

export default function ContactPage() {
  return (
    <SiteChrome>
      <main className="page-content">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">Contact</p>
            <h1>Talk to us about your next office space</h1>
            <p className="hero-text">
              Share your team size, preferred location, and visit plans. We will help you move from
              shortlist to conversation with the right office context in place.
            </p>

            <div className="hero-micro-stats">
              <span>Guided tours</span>
              <span>Video walkthroughs</span>
              <span>Layout consultations</span>
            </div>
          </div>

          <aside className="hero-panel">
            <div className="hero-panel-top">
              <div>
                <p className="eyebrow">Reach us directly</p>
                <h2>Use the form or connect on phone and WhatsApp</h2>
              </div>
              <span className="pill">Fast response</span>
            </div>

            <div className="advantages-grid">
              {contactCards.map((card) => (
                <article key={card.title}>
                  <h3>{card.title}</h3>
                  {card.href ? (
                    <p>
                      <a
                        href={card.href}
                        target={card.href.startsWith("https://") ? "_blank" : undefined}
                        rel={card.href.startsWith("https://") ? "noreferrer" : undefined}
                      >
                        {card.body}
                      </a>
                    </p>
                  ) : (
                    <p>{card.body}</p>
                  )}
                </article>
              ))}
            </div>
          </aside>
        </section>

        <ContactBookingSection />
      </main>
    </SiteChrome>
  );
}
