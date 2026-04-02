"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLockup } from "./brand-lockup";
import { primaryNavItems } from "./site-navigation";

export function SiteHeader() {
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
    <header className="site-header">
      <div className="site-header-main">
        <div className="site-header-left">
          <Link className="brand" href="/" aria-label="Office On Rent home" onClick={() => setMobileNavOpen(false)}>
            <BrandLockup priority />
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
  );
}
