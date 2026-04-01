"use client";

import Image from "next/image";
import { FormEvent, startTransition, useDeferredValue, useEffect, useState } from "react";
import { properties } from "../data/properties";

type Inquiry = {
  fullName: string;
  email: string;
  company: string;
  propertyName: string;
  teamSize: string;
  visitDate: string;
  visitType: string;
};

type StatusMessage = {
  variant: "success" | "error";
  title: string;
  body: string;
};

const storageKey = "office-on-rent-latest-inquiry";
const bookingSectionId = "booking-form";
const footerServices = [
  {
    label: "Coworking Space",
    href: "https://theofficeonrent.com/coworking-space/"
  },
  {
    label: "New Commercial Projects",
    href: "https://theofficeonrent.com/new-commercial-projects/"
  },
  {
    label: "Ready to Move Office",
    href: "https://theofficeonrent.com/ready-to-move-office/"
  },
  {
    label: "Contact US",
    href: "#booking-form"
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

function getLocalDateString() {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60 * 1000;
  return new Date(now.getTime() - timezoneOffset).toISOString().split("T")[0];
}

export function OfficeShowcase() {
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [brochureFilter, setBrochureFilter] = useState("all");
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [latestInquiry, setLatestInquiry] = useState<Inquiry | null>(null);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);

  const deferredLocation = useDeferredValue(locationFilter);
  const deferredType = useDeferredValue(typeFilter);
  const deferredBrochure = useDeferredValue(brochureFilter);

  const zones = Array.from(new Set(properties.map((property) => property.zone)));
  const projectTypes = Array.from(new Set(properties.map((property) => property.type)));
  const featuredProperty = properties[0];
  const selectedProperty = properties.find((property) => property.id === selectedPropertyId) ?? null;

  const filteredProperties = properties.filter((property) => {
    const matchesLocation = deferredLocation === "all" || property.zone === deferredLocation;
    const matchesType = deferredType === "all" || property.type === deferredType;
    const matchesBrochure =
      deferredBrochure === "all" ||
      (deferredBrochure === "with-brochure" ? Boolean(property.brochureUrl) : !property.brochureUrl);

    return matchesLocation && matchesType && matchesBrochure;
  });

  useEffect(() => {
    const storedInquiry = window.localStorage.getItem(storageKey);

    if (!storedInquiry) {
      return;
    }

    try {
      const parsedInquiry = JSON.parse(storedInquiry) as Inquiry;
      setLatestInquiry(parsedInquiry);
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  function resetFilters() {
    setLocationFilter("all");
    setTypeFilter("all");
    setBrochureFilter("all");
  }

  function focusBookingForm() {
    document.getElementById(bookingSectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function selectProperty(propertyId: string) {
    setSelectedPropertyId(propertyId);
    setStatusMessage(null);
    focusBookingForm();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const propertyId = String(formData.get("property") ?? "");
    const property = properties.find((item) => item.id === propertyId);

    if (!property) {
      setStatusMessage({
        variant: "error",
        title: "Select a property",
        body: "Choose an office space before sending your booking request."
      });
      return;
    }

    const inquiry: Inquiry = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      propertyName: property.name,
      teamSize: String(formData.get("teamSize") ?? ""),
      visitDate: String(formData.get("visitDate") ?? ""),
      visitType: String(formData.get("visitType") ?? "")
    };

    window.localStorage.setItem(storageKey, JSON.stringify(inquiry));

    startTransition(() => {
      setLatestInquiry(inquiry);
      setSelectedPropertyId("");
      setStatusMessage({
        variant: "success",
        title: "Booking request saved",
        body: `${inquiry.fullName}, your request for ${inquiry.propertyName} has been captured for ${inquiry.visitDate}.`
      });
    });

    form.reset();
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Office On Rent home">
          <span className="brand-mark">OR</span>
          <span>
            <strong>Office On Rent</strong>
            <small>Commercial Real Estate</small>
          </span>
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#properties">Properties</a>
          <a href="#advantages">Why us</a>
          <a href="#booking-form">Book a visit</a>
        </nav>

        <a className="button button-ghost" href="#booking-form">
          Book Office Space
        </a>
      </header>

      <main id="top" className="page-content">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Imported commercial project data</p>
            <h1>Browse public office project listings and send a booking request from one place.</h1>
            <p className="hero-text">
              We mapped public project information from The Office On Rent into a cleaner booking
              experience so you can compare location, project type, amenities, and brochure
              availability before submitting an enquiry.
            </p>

            <div className="hero-actions">
              <a className="button" href="#properties">
                Browse Properties
              </a>
              <a className="button button-secondary" href="#booking-form">
                Request a Tour
              </a>
            </div>

            <div className="metrics-grid">
              <article>
                <strong>{properties.length}</strong>
                <span>Imported project listings</span>
              </article>
              <article>
                <strong>{zones.length}</strong>
                <span>Indore micro-markets</span>
              </article>
              <article>
                <strong>{properties.filter((property) => property.brochureUrl).length}</strong>
                <span>Projects with brochure links</span>
              </article>
            </div>
          </div>

          <aside className="hero-panel" aria-label="Featured workspace">
            <div className="hero-panel-top">
              <span className="pill">Featured listing</span>
              <span className="pill pill-muted">Public project profile</span>
            </div>

            <div className="hero-panel-visual">
              <Image
                src={featuredProperty.imageUrl}
                alt={featuredProperty.name}
                fill
                className="hero-panel-image"
                sizes="(max-width: 1080px) 100vw, 34vw"
                priority
              />
              <div className={`hero-panel-photo-overlay ${featuredProperty.skin}`} aria-hidden="true" />

              <div className="hero-panel-stage">
                <div className="hero-property-card">
                  <p>{featuredProperty.name}</p>
                  <strong>{featuredProperty.type}</strong>
                  <span>{featuredProperty.location}</span>
                </div>
              </div>
            </div>

            <div className="hero-panel-footer">
              <div>
                <small>Project zone</small>
                <strong>{featuredProperty.zone}</strong>
              </div>
              <div>
                <small>Availability</small>
                <strong>{featuredProperty.availability}</strong>
              </div>
            </div>
          </aside>
        </section>

        <section className="filter-section" id="properties">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Available properties</p>
              <h2>Filter imported projects before you enquire</h2>
            </div>
            <p className="section-note">Showing {filteredProperties.length} public project listings.</p>
          </div>

          <div className="filter-panel">
            <label>
              Project area
              <select value={locationFilter} onChange={(event) => setLocationFilter(event.target.value)}>
                <option value="all">All areas</option>
                {zones.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Project type
              <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
                <option value="all">All types</option>
                {projectTypes.map((projectType) => (
                  <option key={projectType} value={projectType}>
                    {projectType}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Brochure status
              <select value={brochureFilter} onChange={(event) => setBrochureFilter(event.target.value)}>
                <option value="all">All projects</option>
                <option value="with-brochure">With brochure</option>
                <option value="without-brochure">Without brochure</option>
              </select>
            </label>

            <button className="button button-secondary filter-reset" type="button" onClick={resetFilters}>
              Reset filters
            </button>
          </div>

          <div className="property-grid">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <article
                  className={`property-card ${selectedPropertyId === property.id ? "selected" : ""}`}
                  key={property.id}
                >
                  <div className={`property-visual ${property.skin}`}>
                    <Image
                      src={property.imageUrl}
                      alt={property.name}
                      fill
                      className="property-photo"
                      sizes="(max-width: 820px) 100vw, (max-width: 1080px) 50vw, 33vw"
                    />
                    <div className={`property-photo-overlay ${property.skin}`} aria-hidden="true" />
                    <span className="property-badge">{property.type}</span>
                    <div className="property-visual-copy">
                      <small>{property.brochureLabel}</small>
                      <strong>{property.city}</strong>
                    </div>
                  </div>

                  <div className="property-body">
                    <div className="property-header">
                      <div>
                        <h3>{property.name}</h3>
                        <p>{property.location}</p>
                      </div>
                      <div className="property-price">
                        <strong>{property.availability}</strong>
                        <span>{property.zone}</span>
                      </div>
                    </div>

                    <p className="property-summary">{property.summary}</p>

                    <div className="property-metrics">
                      <article>
                        <strong>{property.city}</strong>
                        <span>City</span>
                      </article>
                      <article>
                        <strong>{property.zone}</strong>
                        <span>Zone</span>
                      </article>
                      <article>
                        <strong>{property.brochureUrl ? "Available" : "Page only"}</strong>
                        <span>Brochure</span>
                      </article>
                    </div>

                    <div className="amenity-list">
                      {property.amenities.map((amenity) => (
                        <span key={amenity}>{amenity}</span>
                      ))}
                    </div>

                    <div className="property-actions">
                      <button className="button card-button" type="button" onClick={() => selectProperty(property.id)}>
                        Book this office
                      </button>
                      <a
                        className="button button-secondary card-button"
                        href={property.brochureUrl ?? property.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {property.brochureUrl ? "View brochure" : "Open source page"}
                      </a>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="empty-state">
                <h3>No projects match these filters</h3>
                <p>Reset the filters to see all imported project listings again.</p>
              </div>
            )}
          </div>
        </section>

        <section className="advantages-section" id="advantages">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Why teams choose us</p>
              <h2>Shortlist faster, book with more confidence</h2>
            </div>
          </div>

          <div className="advantages-grid">
            <article>
              <h3>Public project facts</h3>
              <p>Project names, locations, amenities, and brochure links are mapped from publicly visible source pages.</p>
            </article>
            <article>
              <h3>Cleaner shortlisting</h3>
              <p>The imported listings are organized into zones and project types so comparing options is faster.</p>
            </article>
            <article>
              <h3>Property-aware booking</h3>
              <p>Choose a project and the booking form remembers it automatically before you send your enquiry.</p>
            </article>
          </div>
        </section>

        <section className="booking-section" id={bookingSectionId}>
          <div className="booking-card">
            <div className="booking-copy">
              <p className="eyebrow">Book office space</p>
              <h2>Send your workspace request</h2>
              <p>
                Fill out the booking form to request a tour, ask for project details, and start the
                conversation for your preferred office location.
              </p>

              <div className="selected-office-panel">
                <span className="selection-label">Selected property</span>
                {selectedProperty ? (
                  <>
                    <strong>{selectedProperty.name}</strong>
                    <p>
                      {selectedProperty.location} | {selectedProperty.type} | {selectedProperty.availability}
                    </p>
                  </>
                ) : (
                  <>
                    <strong>Choose a property card first</strong>
                    <p>Any office you select above will appear here and in the booking form.</p>
                  </>
                )}
              </div>

              {latestInquiry ? (
                <div className="latest-inquiry">
                  <span className="selection-label">Latest saved inquiry</span>
                  <strong>{latestInquiry.propertyName}</strong>
                  <p>
                    {latestInquiry.fullName} from {latestInquiry.company} requested a{" "}
                    {latestInquiry.visitType.toLowerCase()} for {latestInquiry.visitDate}.
                  </p>
                </div>
              ) : null}
            </div>

            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <label>
                  Full name
                  <input name="fullName" type="text" placeholder="Aarav Malhotra" required />
                </label>

                <label>
                  Work email
                  <input name="email" type="email" placeholder="team@company.com" required />
                </label>

                <label>
                  Company name
                  <input name="company" type="text" placeholder="Northline Studios" required />
                </label>

                <label>
                  Team size
                  <input name="teamSize" type="number" min="1" max="500" placeholder="24" required />
                </label>

                <label>
                  Property
                  <select
                    name="property"
                    value={selectedPropertyId}
                    onChange={(event) => setSelectedPropertyId(event.target.value)}
                    required
                  >
                    <option value="">Select a property</option>
                    {properties.map((property) => (
                      <option key={property.id} value={property.id}>
                        {property.name} | {property.location}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Visit type
                  <select name="visitType" required>
                    <option value="">Select visit type</option>
                    <option value="Guided tour">Guided tour</option>
                    <option value="Video walkthrough">Video walkthrough</option>
                    <option value="Layout consultation">Layout consultation</option>
                  </select>
                </label>
              </div>

              <label>
                Preferred visit date
                <input name="visitDate" type="date" min={getLocalDateString()} required />
              </label>

              <label>
                Additional requirements
                <textarea
                  name="requirements"
                  rows={4}
                  placeholder="Tell us about your move-in timeline, branding needs, meeting room count, or budget expectations."
                />
              </label>

              <label className="checkbox-row">
                <input name="consent" type="checkbox" required />
                <span>I agree to be contacted regarding this office space request.</span>
              </label>

              <button className="button submit-button" type="submit">
                Send Booking Request
              </button>

              <p className="form-note">
                This demo saves the latest inquiry in your browser so the booking flow feels complete.
              </p>

              {statusMessage ? (
                <div className={`status-message ${statusMessage.variant}`}>
                  <strong>{statusMessage.title}</strong>
                  <p>{statusMessage.body}</p>
                </div>
              ) : null}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-grid">
          <section className="footer-column footer-about">
            <p className="eyebrow footer-eyebrow">The Office On Rent</p>
            <p className="footer-description">
              The Office on Rent offers fully-furnished and customizable office spaces for startups,
              freelancers, and established businesses in Indore. Choose from private cabins,
              co-working desks, or entire floors, all designed to meet your growing needs.
            </p>

            <div className="footer-actions">
              <a className="button" href="tel:+918602129377">
                Enquiry Now
              </a>
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
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("https://") ? "_blank" : undefined}
                  rel={item.href.startsWith("https://") ? "noreferrer" : undefined}
                >
                  {item.label}
                </a>
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
