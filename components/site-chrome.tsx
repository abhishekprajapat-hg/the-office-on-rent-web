"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

type SiteChromeProps = {
  children: ReactNode;
};

const primaryNavItems = [
  {
    label: "Home",
    href: "/"
  },
  {
    label: "Properties",
    href: "/properties"
  },
  {
    label: "Coworking",
    href: "/coworking"
  },
  {
    label: "Projects",
    href: "/projects"
  },
  {
    label: "Ready To Move",
    href: "/ready-to-move"
  },
  {
    label: "Why Us",
    href: "/why-us"
  },
  {
    label: "Contact",
    href: "/contact"
  }
] as const;

const footerServices = [
  {
    label: "Coworking Space",
    href: "/coworking"
  },
  {
    label: "New Commercial Projects",
    href: "/projects"
  },
  {
    label: "Ready to Move Office",
    href: "/ready-to-move"
  },
  {
    label: "Contact US",
    href: "/contact"
  }
] as const;

const footerOtherLinks = [
  {
    label: "Blog",
    href: "https://theofficeonrent.com/blog/"
  },
  {
    label: "Privacy Policy",
    href: "https://theofficeonrent.com/privacy-policy/"
  }
] as const;

function BrandLockup({ className = "" }: { className?: string }) {
  const classes = ["brand-logo", className].filter(Boolean).join(" ");

  return <img src="/logo.png" alt="The Office On Rent" width={220} height={108} className={classes} />;
}

export function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 1080) {
        setMobileNavOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  function isActive(href: string) {
    return pathname === href;
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-header-main">
          <div className="site-header-left">
            <Link className="brand" href="/" aria-label="Office On Rent home" onClick={() => setMobileNavOpen(false)}>
              <BrandLockup />
            </Link>

            <nav className="site-nav site-nav-desktop" aria-label="Primary navigation">
              {primaryNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`site-nav-link ${isActive(item.href) ? "active" : ""}`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="site-header-actions">
            <a className="header-link header-link-desktop" href="https://wa.me/918602129377" target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <Link className="button header-cta header-cta-desktop" href="/contact">
              Enquiry Now
              <span aria-hidden="true">-&gt;</span>
            </Link>
            <button
              className={`nav-toggle ${mobileNavOpen ? "open" : ""}`}
              type="button"
              aria-expanded={mobileNavOpen}
              aria-controls="primary-navigation-panel"
              aria-label={mobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setMobileNavOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <div className={`site-header-panel ${mobileNavOpen ? "open" : ""}`} id="primary-navigation-panel">
          <nav className="site-nav" aria-label="Primary navigation">
            {primaryNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`site-nav-link ${isActive(item.href) ? "active" : ""}`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="site-header-actions">
            <a className="header-link" href="https://wa.me/918602129377" target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <Link className="button header-cta" href="/contact">
              Enquiry Now
              <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>
        </div>
      </header>

      {children}

      <footer className="site-footer">
        <div className="footer-grid">
          <section className="footer-column footer-about">
            <BrandLockup className="footer-logo" />
            <p className="footer-description">
              The Office on Rent offers fully-furnished and customizable office spaces for startups,
              freelancers, and established businesses in Indore. Choose from private cabins,
              co-working desks, or entire floors, all designed to meet your growing needs.
            </p>

            <div className="footer-actions">
              <Link className="button" href="/contact">
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
                <Link key={item.label} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </section>

          <section className="footer-column">
            <h3>Other Links</h3>
            <nav className="footer-nav" aria-label="Footer links">
              {footerOtherLinks.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              ))}
            </nav>
          </section>

          <section className="footer-column">
            <h3>Contact</h3>
            <div className="footer-contact-list">
              <a href="tel:+918602129377">+91 86021 29377</a>
              <a href="https://wa.me/918602129377" target="_blank" rel="noreferrer">
                Chat on WhatsApp
              </a>
              <p>Gravity Mall, Plot-27, Mechanic Nagar, Scheme No 54, Indore, Madhya Pradesh 452011</p>
            </div>
          </section>
        </div>

        <div className="footer-bottom">
          <p>Gravity Mall, Plot-27, Mechanic Nagar, Scheme No 54, Indore, Madhya Pradesh 452011</p>
          <div className="footer-bottom-links">
            <span>Terms of Service</span>
            <a href="https://theofficeonrent.com/privacy-policy/" target="_blank" rel="noreferrer">
              Privacy Policy
            </a>
          </div>
          <p>
            Copyright 2025. All rights reserved. Developed &amp; Designed by{" "}
            <a href="https://zenixtechnology.com/" target="_blank" rel="noreferrer">
              Zenix Technology
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
