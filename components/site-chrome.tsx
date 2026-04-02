import Link from "next/link";
import { ReactNode } from "react";
import { BrandLockup } from "./brand-lockup";
import { SiteHeader } from "./site-header";
import { footerHighlights, footerOtherLinks, footerServices } from "./site-navigation";

type SiteChromeProps = {
  children: ReactNode;
};

export function SiteChrome({ children }: SiteChromeProps) {
  return (
    <div className="site-shell">
      <SiteHeader />

      {children}

      <footer className="site-footer">
        <div className="footer-lead">
          <div className="footer-lead-copy">
            <p className="eyebrow footer-eyebrow">Office On Rent</p>
            <h2>Find the right office without the usual back-and-forth</h2>
            <p>
              Browse spaces, compare brochures, and move from shortlist to enquiry with a faster,
              cleaner workflow built around Indore office requirements.
            </p>
          </div>

          <div className="footer-highlight-grid" aria-label="Office On Rent highlights">
            {footerHighlights.map((item) => (
              <article className="footer-highlight-card" key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.body}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="footer-grid">
          <section className="footer-column footer-about">
            <span className="footer-label">Workspace partner</span>
            <BrandLockup className="footer-logo" />
            <p className="footer-description">
              The Office on Rent offers fully-furnished and customizable office spaces for startups,
              freelancers, and established businesses in Indore. Choose from private cabins,
              co-working desks, or entire floors, all designed to meet your growing needs.
            </p>

            <div className="footer-actions">
              <Link className="button" href="/contact" prefetch={false}>
                Enquiry Now
              </Link>
              <a
                className="button button-secondary"
                href="https://wa.me/918602129377"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </section>

          <section className="footer-column">
            <h3>Services</h3>
            <nav className="footer-nav" aria-label="Footer services">
              {footerServices.map((item) => (
                <Link key={item.label} href={item.href} prefetch={false}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </section>

          <section className="footer-column">
            <h3>Other Links</h3>
            <nav className="footer-nav" aria-label="Footer links">
              {footerOtherLinks.map((item) => (
                <Link key={item.label} href={item.href} prefetch={false}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </section>

          <section className="footer-column footer-contact-column">
            <h3>Contact</h3>
            <div className="footer-contact-cards">
              <a className="footer-contact-card" href="tel:+918602129377">
                <small>Call us</small>
                <strong>+91 86021 29377</strong>
              </a>
              <a
                className="footer-contact-card"
                href="https://wa.me/918602129377"
                target="_blank"
                rel="noreferrer"
              >
                <small>WhatsApp</small>
                <strong>Chat with our team</strong>
              </a>
              <div className="footer-contact-card">
                <small>Visit us</small>
                <p>Gravity Mall, Plot-27, Mechanic Nagar, Scheme No 54, Indore, Madhya Pradesh 452011</p>
              </div>
            </div>
          </section>
        </div>

        <div className="footer-bottom">
          <p>Copyright 2025. All rights reserved. Office On Rent, Indore.</p>
          <div className="footer-bottom-links">
            <span>Terms of Service</span>
            <Link href="/privacy-policy" prefetch={false}>
              Privacy Policy
            </Link>
          </div>
          <p>
            Developed &amp; Designed by{" "}
            <a href="https://zenixtechnology.com/" target="_blank" rel="noreferrer">
              Zenix Technology
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
