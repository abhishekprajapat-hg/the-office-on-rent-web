import Image from "next/image";
import { BrandLockup } from "./brand-lockup";
import styles from "./office-showcase.module.css";

type CategoryCard = {
  title: string;
  subtitle: string;
  tone: "teal" | "orange" | "blue";
  imageUrl: string;
};

const heroStats = ["1000+ Clients", "800+ Deals Closed", "PAN India Network"];
const trustedBrands = ["BYJU'S", "intel.", "CocaCola", "HDFC BANK", "TCS", "titan eye+", "OYO"];
const headerImage = "/header-skyline.png";
const whyPoints = [
  "Zero-Brokerage Options",
  "Verified Properties Only",
  "End-to-End Support",
  "End-to-End Support",
  "Strong Negotiation Expertise",
  "PAN India Network Expertise"
];

const categoryCards: CategoryCard[] = [
  {
    title: "Office Spaces",
    subtitle: "Ready to Move | Refresh interiors",
    tone: "teal",
    imageUrl: "https://theofficeonrent.com/wp-content/uploads/2026/03/WhatsApp-Image-2025-12-11-at-2.20.33-PM-1.jpeg"
  },
  {
    title: "Retail Shops",
    subtitle: "Top Footfall Locations",
    tone: "orange",
    imageUrl: "https://theofficeonrent.com/wp-content/uploads/2026/03/WhatsApp-Image-2025-12-11-at-1.17.44-PM.jpeg"
  },
  {
    title: "Investment Properties",
    subtitle: "High ROI Opportunities",
    tone: "blue",
    imageUrl: "https://theofficeonrent.com/wp-content/uploads/2026/03/WhatsApp-Image-2025-12-11-at-1.17.44-PM-1.jpeg"
  },
  {
    title: "Coworking Spaces",
    subtitle: "Flexible and Plug-and-Play Offices",
    tone: "teal",
    imageUrl: "https://theofficeonrent.com/wp-content/uploads/2026/03/WhatsApp-Image-2025-12-11-at-2.20.33-PM-1.jpeg"
  }
];

export function OfficeShowcase() {
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
                <span className={styles.buttonIcon}>Call</span>
                <span>Call Now</span>
              </a>
              <a href="tel:+919831336666" className={`${styles.callButton} ${styles.callGreen}`}>
                <span className={styles.buttonIcon}>Call</span>
                <span>+91 983-133-6666</span>
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
          <div className={styles.brandRow}>
            {trustedBrands.map((brand) => (
              <span key={brand}>{brand}</span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.categoriesSection}>
        <div className={styles.shell}>
          <div className={styles.categoriesGrid}>
            {categoryCards.map((card) => (
              <article className={styles.categoryCard} key={card.title}>
                <div className={styles.cardImageWrap}>
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
                  <a href="#consultation-form">Get Details</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.whySection}>
        <div className={styles.shell}>
          <h2>Why Choose Us?</h2>
          <ul>
            {whyPoints.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
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
            src={headerImage}
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
              <span className={styles.buttonIcon}>Call</span>
              <span>Call Now</span>
            </a>
            <a
              className={`${styles.actionButton} ${styles.actionGreen}`}
              href="https://wa.me/919831336666"
              target="_blank"
              rel="noreferrer"
            >
              <span className={styles.buttonIcon}>Chat</span>
              <span>WhatsApp</span>
            </a>
            <a className={`${styles.actionButton} ${styles.actionOrange}`} href="#consultation-form">
              <span className={styles.buttonIcon}>Mail</span>
              <span>Get Options</span>
            </a>
          </div>

          <div className={styles.contactCard}>
            <BrandLockup className={styles.footerLogo} />
            <p className={styles.contactLine}>Indore Office | +91 968-936-1156 | +89-1939-666</p>
            <p className={styles.emailLine}>info@theofficeonrent.com</p>
          </div>
        </div>
      </section>
    </main>
  );
}
