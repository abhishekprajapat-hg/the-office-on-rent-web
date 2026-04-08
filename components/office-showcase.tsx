"use client";

import { type FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { BrandLockup } from "./brand-lockup";
import styles from "./office-showcase.module.css";

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
  quote: string;
  rating: number;
};

type WhyPoint = {
  title: string;
  detail: string;
};

const requirementOptions = [
  "Office Space furnished",
  "Office Space Non- Furnished",
  "Showrooms / shops",
  "Commercial investment",
  "coworking"
] as const;

const purposeOptions = ["Rent", "Sale", "Purchase", "Lease"] as const;

type RequirementOption = (typeof requirementOptions)[number];
type RequirementValue = RequirementOption | "";
type PurposeOption = (typeof purposeOptions)[number];
type PurposeValue = PurposeOption | "";

const minimumAmountByPurpose: Record<PurposeOption, number> = {
  Rent: 30000,
  Sale: 5000000,
  Purchase: 5000000,
  Lease: 100000
};

const requirementByCardTitle: Record<string, RequirementOption> = {
  "Office Spaces": "Office Space furnished",
  "Retail Showrooms": "Showrooms / shops",
  "Commercial Investments": "Commercial investment",
  "Coworking Spaces": "coworking"
};

const consultationWhatsappNumber = "919111832003";

const getMinimumAmount = (purpose: PurposeValue) => (purpose ? minimumAmountByPurpose[purpose].toString() : "");

const heroStats = ["500+ Clients", "250+ Deals Closed", "Zero Brokerage options"];
const headerImage = "/header-skyline.png";
const footerImage = "/footer.png";
const whyPoints: WhyPoint[] = [
  {
    title: "Zero-Brokerage Options",
    detail: "No Brokerage for commercial properties, ensuring cost-effective solutions for businesses."
  },
  {
    title: "Property Management",
    detail: "End-to-end property management services for hassle-free operations."
  },
  {
    title: "Property Development",
    detail: "Strategic property development initiatives for optimal returns."
  },
  {
    title: "Co-Working Spaces",
    detail: "Flexible, fully-equipped co-working spaces and plug-and-play offices for growing teams."
  },
  {
    title: "Commercial Investments",
    detail: "High ROI commercial investment opportunities with expert guidance."
  },
  {
    title: "Leaseing Services",
    detail: "Comprehensive leasing services for office spaces, retail showrooms and commercial properties."
  }
];

const categoryCards: CategoryCard[] = [
  {
    title: "Office Spaces",
    badge: "Ready Inventory",
    subtitle: "Non-Furnished | Furnished Options",
    tone: "teal",
    imageUrl: "https://theofficeonrent.com/wp-content/uploads/2026/03/WhatsApp-Image-2025-12-11-at-2.20.33-PM-1.jpeg"
  },
  {
    title: "Retail Showrooms",
    badge: "Prime Locations",
    subtitle: "Showrooms | Shops",
    tone: "orange",
    imageUrl: "https://theofficeonrent.com/wp-content/uploads/2026/03/WhatsApp-Image-2025-12-11-at-1.17.44-PM.jpeg"
  },
  {
    title: "Commercial Investments",
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
    quote:
      "Team ne 5 din ke andar hume ready office shortlist karke final deal close kara di. Process smooth tha and zero brokerage exactly as promised.",
    rating: 5
  },
  {
    name: "Aditi Sharma",
    quote:
      "Location recommendations bahut accurate the. Humare retail outlet ke liye prime footfall zone mila and negotiation bhi strong handle kiya gaya.",
    rating: 5
  },
  {
    name: "Vivek Bansal",
    quote:
      "PAN India expansion me inki support genuinely end-to-end thi. Site visits se agreement tak har step pe quick response mila.",
    rating: 5
  }
];

export function OfficeShowcase() {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [desktopRequirement, setDesktopRequirement] = useState<RequirementValue>("");
  const [desktopPurpose, setDesktopPurpose] = useState<PurposeValue>("");
  const [desktopMaxAmount, setDesktopMaxAmount] = useState("");
  const [mobileRequirement, setMobileRequirement] = useState<RequirementValue>("");
  const [mobilePurpose, setMobilePurpose] = useState<PurposeValue>("");
  const [mobileMaxAmount, setMobileMaxAmount] = useState("");
  const [modalRequirement, setModalRequirement] = useState<RequirementValue>("");
  const [modalPurpose, setModalPurpose] = useState<PurposeValue>("");
  const [modalMaxAmount, setModalMaxAmount] = useState("");

  const scrollToFooter = () => {
    const footerSection = document.getElementById("footer-enquiry");
    if (footerSection) {
      footerSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const openDetailsModal = (requirement: string) => {
    setModalRequirement(requirementByCardTitle[requirement] ?? requirementOptions[0]);
    setModalPurpose("");
    setModalMaxAmount("");
    setIsDetailsModalOpen(true);
  };

  const scrollToConsultation = () => {
    const isMobile = window.matchMedia("(max-width: 760px)").matches;
    const desktopForm = document.getElementById("consultation-form");
    const mobileForm = document.getElementById("consultation-form-mobile");
    const targetForm = isMobile ? mobileForm ?? desktopForm : desktopForm ?? mobileForm;
    if (targetForm) {
      targetForm.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
  };

  const submitConsultationForm = (
    event: FormEvent<HTMLFormElement>,
    source: "Desktop Form" | "Mobile Form" | "Details Modal",
    selectedRequirement: RequirementValue,
    selectedPurpose: PurposeValue
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString().trim() ?? "";
    const mobile = formData.get("mobile")?.toString().trim() ?? "";
    const city = formData.get("city")?.toString().trim() ?? "";
    const maxAmount = formData.get("maximumAmount")?.toString().trim() ?? "";
    const minAmount = selectedPurpose ? getMinimumAmount(selectedPurpose) : "";

    const whatsappLines = [
      "New Free Consultation Enquiry",
      `Source: ${source}`,
      `Name: ${name || "Not provided"}`,
      `Mobile: ${mobile || "Not provided"}`,
      `Requirement: ${selectedRequirement || "Not selected"}`,
      `Purpose: ${selectedPurpose || "Not selected"}`,
      `Minimum Amount: ${minAmount || "Not selected"}`,
      `Maximum Amount: ${maxAmount || "Not provided"}`,
      `City: ${city || "Not selected"}`
    ];

    const whatsappUrl = `https://wa.me/${consultationWhatsappNumber}?text=${encodeURIComponent(whatsappLines.join("\n"))}`;
    const whatsappWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    if (!whatsappWindow) {
      window.location.href = whatsappUrl;
    }

    if (source === "Details Modal") {
      closeDetailsModal();
    }
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
        key={`${prefix}-hdfc`}
        src="/brand-logos/hdfc-bank.svg"
        alt="HDFC Bank logo"
        className={`${styles.brandLogo} ${styles.hdfcLogo}`}
        loading="lazy"
      />
      <img
        key={`${prefix}-efc`}
        src="/brand-logos/EspLogo.svg"
        alt="EFC logo"
        className={`${styles.brandLogo} ${styles.efcLogo}`}
        loading="lazy"
      />
      
      <img
        key={`${prefix}-ksolves`}
        src="/brand-logos/kslogo-ai.webp"
        alt="Ksolves logo"
        className={`${styles.brandLogo} ${styles.ksolvesLogo}`}
        loading="lazy"
      />
      
      <img
        key={`${prefix}-oyo`}
        src="/brand-logos/oyo.png"
        alt="OYO logo"
        className={`${styles.brandLogo} ${styles.oyoLogo}`}
        loading="lazy"
      />
      <img
        key={`${prefix}-Nippon Mutual Fund`}
        src="/brand-logos/nippon-mutual-fund.png"
        alt="Nippon Mutual Fund logo"
        className={`${styles.brandLogo} ${styles.nipponMutualFundLogo}`}
        loading="lazy"
      />
      <img
        key={`${prefix}-Bandhan Mutual Fund`}
        src="/brand-logos/bandhan-mutual-fund.svg"
        alt="Bandhan Mutual Fund logo"
        className={`${styles.brandLogo} ${styles.bandhanMutualFundLogo}`}
        loading="lazy"
      />
      <img
        key={`${prefix}-Ugro Finance`}
        src="/brand-logos/ugro-finance.webp"
        alt="Ugro Finance logo"
        className={`${styles.brandLogo} ${styles.ugroFinanceLogo}`}
        loading="lazy"
      />
      <img
        key={`${prefix}-Century Ply`}
        src="/brand-logos/century-ply.png"
        alt="Century Ply logo"
        className={`${styles.brandLogo} ${styles.centuryPlyLogo}`}
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
              <a
                href="#footer-enquiry"
                className={`${styles.callButton} ${styles.enquireButton}`}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToFooter();
                }}
              >
                <span className={styles.buttonIcon}><MailIcon /></span>
                <span>Enquire Now</span>
              </a>
            </div>
          </header>

          <div className={styles.heroHeading}>
            <h1>
              Find the Perfect <span className={styles.wordOrange}>Office</span>
              <span className={styles.wordSlash}> / </span>
              <span className={styles.wordTeal}>Showrooms</span>
              <span className={styles.wordSlash}> / </span>
              <span className={styles.wordOrange}>Coworking Space</span> in Indore
            </h1>
            <p>Fully Furnished | Non-Furnished |Investment Options</p>
          </div>

          <div className={styles.statsRow}>
            {heroStats.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <div className={styles.heroBody}>
            <form
              className={styles.consultForm}
              id="consultation-form"
              onSubmit={(event) => submitConsultationForm(event, "Desktop Form", desktopRequirement, desktopPurpose)}
            >
              <h2>Get Free Consultation</h2>
              <input type="text" name="name" placeholder="Name" aria-label="Name" />
              <input type="tel" name="mobile" placeholder="Mobile" aria-label="Mobile" />
              <select
                name="requirement"
                aria-label="Your Requirement"
                value={desktopRequirement}
                onChange={(event) => setDesktopRequirement(event.target.value as RequirementValue)}
              >
                <option value="" disabled>
                  Your Requirement
                </option>
                {requirementOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <select
                name="purpose"
                aria-label="Purpose"
                value={desktopPurpose}
                onChange={(event) => {
                  setDesktopPurpose(event.target.value as PurposeValue);
                  setDesktopMaxAmount("");
                }}
              >
                <option value="" disabled>
                  Purpose
                </option>
                {purposeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {desktopPurpose ? (
                <div className={styles.amountRow}>
                  <input
                    type="number"
                    name="minimumAmount"
                    placeholder="Minimum Amount"
                    aria-label="Minimum Amount"
                    value={getMinimumAmount(desktopPurpose)}
                    readOnly
                  />
                  <input
                    type="number"
                    name="maximumAmount"
                    placeholder="Maximum Amount"
                    aria-label="Maximum Amount"
                    min={getMinimumAmount(desktopPurpose)}
                    value={desktopMaxAmount}
                    onChange={(event) => setDesktopMaxAmount(event.target.value)}
                  />
                </div>
              ) : null}
              <select name="city" aria-label="City" defaultValue="">
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
            <span>Trusted by 500+ Businesses</span>
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

      <section className={styles.mobileConsultSection}>
        <div className={styles.shell}>
          <form
            className={`${styles.consultForm} ${styles.mobileConsultForm}`}
            id="consultation-form-mobile"
            onSubmit={(event) => submitConsultationForm(event, "Mobile Form", mobileRequirement, mobilePurpose)}
          >
            <h2>Get Free Consultation</h2>
            <input type="text" name="name" placeholder="Name" aria-label="Name" />
            <input type="tel" name="mobile" placeholder="Mobile" aria-label="Mobile" />
            <select
              name="requirement"
              aria-label="Your Requirement"
              value={mobileRequirement}
              onChange={(event) => setMobileRequirement(event.target.value as RequirementValue)}
            >
              <option value="" disabled>
                Your Requirement
              </option>
              {requirementOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              name="purpose"
              aria-label="Purpose"
              value={mobilePurpose}
              onChange={(event) => {
                setMobilePurpose(event.target.value as PurposeValue);
                setMobileMaxAmount("");
              }}
            >
              <option value="" disabled>
                Purpose
              </option>
              {purposeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {mobilePurpose ? (
              <div className={styles.amountRow}>
                <input
                  type="number"
                  name="minimumAmount"
                  placeholder="Minimum Amount"
                  aria-label="Minimum Amount"
                  value={getMinimumAmount(mobilePurpose)}
                  readOnly
                />
                <input
                  type="number"
                  name="maximumAmount"
                  placeholder="Maximum Amount"
                  aria-label="Maximum Amount"
                  min={getMinimumAmount(mobilePurpose)}
                  value={mobileMaxAmount}
                  onChange={(event) => setMobileMaxAmount(event.target.value)}
                />
              </div>
            ) : null}
            <select name="city" aria-label="City" defaultValue="">
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
            <h2>Client Testimonials</h2>
            <p>Feedback from businesses we helped with offices, showrooms and coworking spaces.</p>
          </div>

          <div className={styles.reviewsLayout}>
            <aside className={styles.reviewSummaryCard}>
              <p className={styles.reviewScore}>4.9</p>
              <p className={styles.reviewStars}>{"\u2605\u2605\u2605\u2605\u2605"}</p>
              <p className={styles.reviewSummaryText}>
                Trusted by growing teams for fast shortlisting, strong negotiation and hassle-free closure.
              </p>
            </aside>

            <div className={styles.testimonialGrid}>
              {testimonialCards.map((item) => (
                <article key={item.name} className={styles.testimonialCard}>
                  <p className={styles.testimonialQuote}>"{item.quote}"</p>
                  <p className={styles.testimonialStars}>{"\u2605".repeat(item.rating)}</p>
                  <p className={styles.testimonialName}>{item.name}</p>
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

      <section className={styles.actionSection} id="footer-enquiry">
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
            <a
              className={`${styles.actionButton} ${styles.actionGreen}`}
              href={`https://wa.me/${consultationWhatsappNumber}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className={styles.buttonIcon}><ChatIcon /></span>
              <span>WhatsApp</span>
            </a>
            <a
              className={`${styles.actionButton} ${styles.actionOrange}`}
              href="#consultation-form"
              onClick={(event) => {
                event.preventDefault();
                scrollToConsultation();
              }}
            >
              <span className={styles.buttonIcon}><MailIcon /></span>
              <span>Get Options</span>
            </a>
          </div>

          <div className={styles.contactCard}>
            <div className={styles.contactContent}>
              <BrandLockup className={styles.footerLogo} />
              <div className={styles.contactText}>
                <p className={styles.contactHeading}>Direct Enquiry Contacts</p>
                <div className={styles.contactRows}>
                  <p className={styles.contactRow}>
                    <span className={styles.contactLabel}>Commercial</span>
                    <a className={styles.contactValue} href="tel:+919111832003">
                      +919111832003
                    </a>
                  </p>
                  <p className={styles.contactRow}>
                    <span className={styles.contactLabel}>Coworking</span>
                    <a className={styles.contactValue} href="tel:+917909702003">
                      +917909702003
                    </a>
                  </p>
                  <p className={styles.contactRow}>
                    <span className={styles.contactLabel}>Investment</span>
                    <a className={styles.contactValue} href="tel:+919522682003">
                      +919522682003
                    </a>
                  </p>
                </div>
                <p className={styles.emailLine}>
                  <span className={styles.contactLabel}>Email</span>
                  <a className={styles.contactValue} href="mailto:theofficeonrent.ws@gmail.com">
                    theofficeonrent.ws@gmail.com
                  </a>
                </p>
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
              onSubmit={(event) => submitConsultationForm(event, "Details Modal", modalRequirement, modalPurpose)}
            >
              <h2 id="details-modal-title">Get Free Consultation</h2>
              <input type="text" name="name" placeholder="Name" aria-label="Name" />
              <input type="tel" name="mobile" placeholder="Mobile" aria-label="Mobile" />
              <select
                name="requirement"
                aria-label="Your Requirement"
                value={modalRequirement}
                onChange={(event) => setModalRequirement(event.target.value as RequirementValue)}
              >
                <option value="" disabled>
                  Your Requirement
                </option>
                {requirementOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <select
                name="purpose"
                aria-label="Purpose"
                value={modalPurpose}
                onChange={(event) => {
                  setModalPurpose(event.target.value as PurposeValue);
                  setModalMaxAmount("");
                }}
              >
                <option value="" disabled>
                  Purpose
                </option>
                {purposeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {modalPurpose ? (
                <div className={styles.amountRow}>
                  <input
                    type="number"
                    name="minimumAmount"
                    placeholder="Minimum Amount"
                    aria-label="Minimum Amount"
                    value={getMinimumAmount(modalPurpose)}
                    readOnly
                  />
                  <input
                    type="number"
                    name="maximumAmount"
                    placeholder="Maximum Amount"
                    aria-label="Maximum Amount"
                    min={getMinimumAmount(modalPurpose)}
                    value={modalMaxAmount}
                    onChange={(event) => setModalMaxAmount(event.target.value)}
                  />
                </div>
              ) : null}
              <select name="city" aria-label="City" defaultValue="">
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


