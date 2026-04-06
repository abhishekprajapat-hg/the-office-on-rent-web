"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BrandLockup } from "./brand-lockup";
import styles from "./office-showcase.module.css";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.9 19.9 0 0 1 3 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.12.86.33 1.69.62 2.49a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.91 6.91l1.27-1.27a2 2 0 0 1 2.11-.45c.8.29 1.63.5 2.49.62A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 8.4 8.4 0 0 1-3.47-.74L3 21l1.74-5.78A8.4 8.4 0 0 1 4 11.5 8.5 8.5 0 1 1 21 11.5z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
      <path d="m22 7-10 7L2 7" />
    </svg>
  );
}

type CategoryCard = {
  title: string;
  badge: string;
  subtitle: string;
  tone: "teal" | "orange" | "blue";
  imageUrl: string;
};

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
};

type WhyPoint = {
  title: string;
  detail: string;
};

const heroStats = ["1000+ Clients", "800+ Deals Closed", "PAN India Network"];
const headerImage = "/header-skyline.png";
const footerImage = "/footer.png";
const whyPoints: WhyPoint[] = [
  {
    title: "Zero-Brokerage Options",
    detail: "No hidden brokerage, only transparent and direct commercial terms."
  },
  {
    title: "Verified Properties Only",
    detail: "Every listing is verified for ownership, location and commercial readiness."
  },
  {
    title: "End-to-End Support",
    detail: "From requirement mapping to agreement signing, we manage the full process."
  },
  {
    title: "Strong Negotiation Expertise",
    detail: "Our team helps secure better rentals, lock-in clauses and fit-out flexibility."
  },
  {
    title: "PAN India Network Expertise",
    detail: "Reliable inventory access across major business hubs and emerging corridors."
  },
  {
    title: "Fast Turnaround",
    detail: "Quick shortlist and site visits so your team can move in without delays."
  }
];

const categoryCards: CategoryCard[] = [
  {
    title: "Office Spaces",
    badge: "Ready Inventory",
    subtitle: "Ready to Move | Refresh interiors",
    tone: "teal",
    imageUrl: "https://theofficeonrent.com/wp-content/uploads/2026/03/WhatsApp-Image-2025-12-11-at-2.20.33-PM-1.jpeg"
  },
  {
    title: "Retail Shops",
    badge: "High Footfall",
    subtitle: "Top Footfall Locations",
    tone: "orange",
    imageUrl: "https://theofficeonrent.com/wp-content/uploads/2026/03/WhatsApp-Image-2025-12-11-at-1.17.44-PM.jpeg"
  },
  {
    title: "Investment Properties",
    badge: "Top ROI",
    subtitle: "High ROI Opportunities",
    tone: "blue",
    imageUrl: "https://theofficeonrent.com/wp-content/uploads/2026/03/WhatsApp-Image-2025-12-11-at-1.17.44-PM-1.jpeg"
  },
  {
    title: "Coworking Spaces",
    badge: "Flexible Plans",
    subtitle: "Flexible and Plug-and-Play Offices",
    tone: "teal",
    imageUrl: "https://theofficeonrent.com/wp-content/uploads/2026/03/WhatsApp-Image-2025-12-11-at-2.20.33-PM-1.jpeg"
  }
];

const testimonialCards: Testimonial[] = [
  {
    name: "Rohit Mehta",
    role: "Founder, FinEdge Advisors",
    quote:
      "Team ne 5 din ke andar hume ready office shortlist karke final deal close kara di. Process smooth tha and zero brokerage exactly as promised.",
    rating: 5
  },
  {
    name: "Aditi Sharma",
    role: "Operations Head, RetailNest",
    quote:
      "Location recommendations bahut accurate the. Humare retail outlet ke liye prime footfall zone mila and negotiation bhi strong handle kiya gaya.",
    rating: 5
  },
  {
    name: "Vivek Bansal",
    role: "Regional Manager, CoreTech Solutions",
    quote:
      "PAN India expansion me inki support genuinely end-to-end thi. Site visits se agreement tak har step pe quick response mila.",
    rating: 5
  }
];

const reviewStats = [
  { label: "Average Rating", value: "4.9 / 5" },
  { label: "Verified Reviews", value: "350+" },
  { label: "Client Satisfaction", value: "98%" }
];

export function OfficeShowcase() {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [modalRequirement, setModalRequirement] = useState("");

  const openDetailsModal = (requirement: string) => {
    setModalRequirement(requirement);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
  };

  useEffect(() => {
    if (!isDetailsModalOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDetailsModal();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isDetailsModalOpen]);

  const renderTrustedLogos = (prefix: string) => (
    <>
      <img
        key={`${prefix}-byjus`}
        src="/brand-logos/byjus.png"
        alt="BYJU'S logo"
        className={`${styles.brandLogo} ${styles.byjusLogo}`}
        loading="lazy"
      />
      <img
        key={`${prefix}-intel`}
        src="/brand-logos/intel.svg"
        alt="intel logo"
        className={`${styles.brandLogo} ${styles.intelLogo}`}
        loading="lazy"
      />
      <img
        key={`${prefix}-cocacola`}
        src="/brand-logos/coca-cola.svg"
        alt="Coca-Cola logo"
        className={`${styles.brandLogo} ${styles.cocaColaLogo}`}
        loading="lazy"
      />
      <img
        key={`${prefix}-hdfc`}
        src="/brand-logos/hdfc-bank.svg"
        alt="HDFC Bank logo"
        className={`${styles.brandLogo} ${styles.hdfcLogo}`}
        loading="lazy"
      />
      <div key={`${prefix}-tcstitan`} className={styles.tcsTitanGroup}>
        <img
          src="/brand-logos/tcs.svg"
          alt="TCS logo"
          className={`${styles.brandLogo} ${styles.tcsLogo}`}
          loading="lazy"
        />
        <span className={styles.titanEyeText}>Titan eye+</span>
      </div>
      <img
        key={`${prefix}-oyo`}
        src="/brand-logos/oyo.png"
        alt="OYO logo"
        className={`${styles.brandLogo} ${styles.oyoLogo}`}
        loading="lazy"
      />
    </>
  );

  return (
    <main className={styles.page}>
      <section className={styles.heroSection}>
        <div className={styles.heroBackground} aria-hidden="true">
          <Image
            src={headerImage}
            alt="City skyline"
            fill
            priority
            quality={86}
            className={styles.heroBackgroundImage}
            sizes="100vw"
          />
          <div className={styles.heroBackgroundTint} />
        </div>

        <div className={styles.shell}>
          <header className={styles.topBar}>
            <BrandLockup className={styles.heroLogo} priority />
            <div className={styles.callCluster}>
              <a href="tel:+919831336666" className={`${styles.callButton} ${styles.callLight}`}>
                <span className={styles.buttonIcon}><PhoneIcon /></span>
                <span>Call Now</span>
              </a>
              <a
                href="https://wa.me/919831336666"
                className={`${styles.callButton} ${styles.callGreen}`}
                target="_blank"
                rel="noreferrer"
              >
                <span className={styles.buttonIcon}><ChatIcon /></span>
                <span>WhatsApp</span>
              </a>
            </div>
          </header>

          <div className={styles.heroHeading}>
            <h1>
              Find the Perfect <span className={styles.wordTeal}>Office</span>
              <span className={styles.wordSlash}> / </span>
              <span className={styles.wordOrange}>Shop</span>
              <span className={styles.wordSlash}> / </span>
              <span className={styles.wordBlue}>Coworking Space</span> in Your City
            </h1>
            <p>Fully Furnished | Ready to Move | Zero Brokerage Options</p>
          </div>

          <div className={styles.statsRow}>
            {heroStats.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <div className={styles.heroBody}>
            <form className={styles.consultForm} id="consultation-form">
              <h2>Get Free Consultation</h2>
              <input type="text" placeholder="Name" aria-label="Name" />
              <input type="tel" placeholder="Mobile" aria-label="Mobile" />
              <select aria-label="Your Requirement" defaultValue="">
                <option value="" disabled>
                  Your Requirement
                </option>
                <option>Office</option>
                <option>Shop</option>
                <option>Investment</option>
                <option>Coworking</option>
              </select>
              <select aria-label="City" defaultValue="">
                <option value="" disabled>
                  City
                </option>
                <option>Indore</option>
                <option>Bhopal</option>
                <option>Pune</option>
                <option>Delhi NCR</option>
              </select>
              <button type="submit">Get Free Consultation</button>
            </form>
          </div>
        </div>
      </section>

      <section className={styles.trustedSection}>
        <div className={styles.shell}>
          <h2>
            <span>Trusted by 1000+ Businesses Across India</span>
          </h2>
          <div className={styles.brandMarquee}>
            <div className={styles.brandTrack}>
              <div className={styles.brandRow}>{renderTrustedLogos("set1")}</div>
              <div className={styles.brandRow} aria-hidden="true">
                {renderTrustedLogos("set2")}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.categoriesSection}>
        <div className={styles.shell}>
          <div className={styles.categoriesGrid}>
            {categoryCards.map((card) => (
              <article className={styles.categoryCard} key={card.title}>
                <div className={styles.cardImageWrap}>
                  <span className={`${styles.cardBadge} ${styles[`${card.tone}Badge`]}`}>{card.badge}</span>
                  <Image
                    src={card.imageUrl}
                    alt={card.title}
                    fill
                    quality={80}
                    className={styles.cardImage}
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw"
                  />
                </div>
                <div className={`${styles.cardBody} ${styles[card.tone]}`}>
                  <h3>{card.title}</h3>
                  <p>{card.subtitle}</p>
                  <button type="button" onClick={() => openDetailsModal(card.title)}>
                    Get Details
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.reviewsSection}>
        <div className={styles.shell}>
          <div className={styles.reviewsHeading}>
            <h2>Client Testimonials and Reviews</h2>
            <p>Real feedback from businesses who found their ideal office with us.</p>
          </div>

          <div className={styles.reviewsLayout}>
            <aside className={styles.reviewSummaryCard}>
              <p className={styles.reviewScore}>4.9</p>
              <p className={styles.reviewStars}>{"\u2605\u2605\u2605\u2605\u2605"}</p>
              <p className={styles.reviewSummaryText}>Based on 350+ verified client reviews</p>
              <ul className={styles.reviewStatList}>
                {reviewStats.map((item) => (
                  <li key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </li>
                ))}
              </ul>
            </aside>

            <div className={styles.testimonialGrid}>
              {testimonialCards.map((item) => (
                <article key={item.name} className={styles.testimonialCard}>
                  <p className={styles.testimonialQuote}>"{item.quote}"</p>
                  <p className={styles.testimonialStars}>{"\u2605".repeat(item.rating)}</p>
                  <p className={styles.testimonialName}>{item.name}</p>
                  <p className={styles.testimonialRole}>{item.role}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.whySection}>
        <div className={styles.shell}>
          <div className={styles.whyHeader}>
            <h2>Why Choose Us?</h2>
            <p>Built for speed, trust and long-term business value.</p>
          </div>

          <div className={styles.whyHighlights}>
            <div>
              <strong>1000+</strong>
              <span>Clients Served</span>
            </div>
            <div>
              <strong>800+</strong>
              <span>Deals Closed</span>
            </div>
            <div>
              <strong>PAN India</strong>
              <span>Market Network</span>
            </div>
          </div>

          <ul className={styles.whyGrid}>
            {whyPoints.map((item) => (
              <li key={item.title} className={styles.whyItem}>
                <span className={styles.whyIcon} aria-hidden="true" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.promoStrip}>
        <p>Limited Premium Properties Available - Book Your Free Consultation Now!</p>
      </section>

      <section className={styles.actionSection}>
        <div className={styles.actionBackground} aria-hidden="true">
          <Image
            src={footerImage}
            alt="City background"
            fill
            quality={86}
            className={styles.actionBackgroundImage}
            sizes="100vw"
          />
          <div className={styles.actionBackgroundOverlay} />
        </div>

        <div className={styles.shell}>
          <div className={styles.actionMeta}>
            <span>Free Site Visit</span>
            <span>Investment Advice</span>
            <span>Zero Brokerage Charges</span>
          </div>

          <div className={styles.actionButtons}>
            <a className={`${styles.actionButton} ${styles.actionBlue}`} href="tel:+919831336666">
              <span className={styles.buttonIcon}><PhoneIcon /></span>
              <span>Call Now</span>
            </a>
            <a
              className={`${styles.actionButton} ${styles.actionGreen}`}
              href="https://wa.me/919831336666"
              target="_blank"
              rel="noreferrer"
            >
              <span className={styles.buttonIcon}><ChatIcon /></span>
              <span>WhatsApp</span>
            </a>
            <a className={`${styles.actionButton} ${styles.actionOrange}`} href="#consultation-form">
              <span className={styles.buttonIcon}><MailIcon /></span>
              <span>Get Options</span>
            </a>
          </div>

          <div className={styles.contactCard}>
            <div className={styles.contactContent}>
              <BrandLockup className={styles.footerLogo} />
              <div className={styles.contactText}>
                <p className={styles.contactLine}>Indore Office | +91 968-936-1156 | +89-1939-666</p>
                <p className={styles.emailLine}>info@theofficeonrent.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isDetailsModalOpen ? (
        <div className={styles.modalOverlay} role="presentation" onClick={closeDetailsModal}>
          <div
            className={styles.modalDialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="details-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className={styles.modalClose} onClick={closeDetailsModal} aria-label="Close form">
              ×
            </button>
            <form
              className={`${styles.consultForm} ${styles.modalForm}`}
              onSubmit={(event) => {
                event.preventDefault();
                closeDetailsModal();
              }}
            >
              <h2 id="details-modal-title">Get Free Consultation</h2>
              <input type="text" placeholder="Name" aria-label="Name" />
              <input type="tel" placeholder="Mobile" aria-label="Mobile" />
              <select
                aria-label="Your Requirement"
                value={modalRequirement}
                onChange={(event) => setModalRequirement(event.target.value)}
              >
                {categoryCards.map((item) => (
                  <option key={item.title} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
              <select aria-label="City" defaultValue="">
                <option value="" disabled>
                  City
                </option>
                <option>Indore</option>
                <option>Bhopal</option>
                <option>Pune</option>
                <option>Delhi NCR</option>
              </select>
              <button type="submit">Get Free Consultation</button>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  );
}


