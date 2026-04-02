"use client";

import Image from "next/image";
import { FormEvent, startTransition, useDeferredValue, useEffect, useState } from "react";
import { properties } from "../data/properties";
import { SiteChrome } from "./site-chrome";

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
  const heroHighlights = [
    `${properties.length}+ verified office options`,
    `${zones.length} prime Indore zones`,
    `${properties.filter((property) => property.brochureUrl).length} brochure-ready projects`
  ];
  const heroAmenities = featuredProperty.amenities.slice(0, 3);
  const heroZones = zones.slice(0, 4);
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
    <SiteChrome>
      <main id="top" className="page-content">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">Office On Rent Indore</p>
            <h1>
              Find your next <span>office space</span> in Indore
            </h1>
            <p className="hero-text">
              Explore workspace options across Indore with clearer property context, brochure-backed
              listings, and a faster enquiry flow for startups, professionals, and growing teams.
            </p>

            <div className="hero-actions">
              <a className="button" href="#properties">
                Explore Spaces
              </a>
              <a className="button button-secondary" href="#booking-form">
                Book a Visit
              </a>
            </div>

            <div className="hero-highlight-list" aria-label="Key highlights">
              {heroHighlights.map((highlight) => (
                <span key={highlight}>{highlight}</span>
              ))}
            </div>

            <div className="hero-micro-stats">
              <span>Shortlist by location</span>
              <span>Compare project types</span>
              <span>Book visits in one flow</span>
            </div>
          </div>

          <aside className="hero-showcase" aria-label="Featured workspace">
            <div className="hero-showcase-frame">
              <Image
                src={featuredProperty.imageUrl}
                alt={featuredProperty.name}
                fill
                className="hero-showcase-image"
                sizes="(max-width: 1080px) 100vw, 48vw"
                quality={74}
                priority
              />
              <div className={`hero-showcase-overlay ${featuredProperty.skin}`} aria-hidden="true" />

              <div className="hero-showcase-top">
                <span className="hero-media-chip">Featured workspace</span>
                <span className="hero-showcase-pill">{featuredProperty.type}</span>
              </div>

              <div className="hero-showcase-content">
                <div className="hero-showcase-card">
                  <span className="selection-label">Featured property</span>
                  <strong>{featuredProperty.name}</strong>
                  <p>{featuredProperty.location}</p>

                  <div className="hero-showcase-meta">
                    <article>
                      <small>Availability</small>
                      <strong>{featuredProperty.availability}</strong>
                    </article>
                    <article>
                      <small>Brochure</small>
                      <strong>{featuredProperty.brochureUrl ? "Available" : "Page only"}</strong>
                    </article>
                  </div>

                  <div className="hero-showcase-amenities">
                    {heroAmenities.map((amenity) => (
                      <span key={amenity}>{amenity}</span>
                    ))}
                  </div>

                  <div className="hero-showcase-actions">
                    <button className="button" type="button" onClick={() => selectProperty(featuredProperty.id)}>
                      Book This Office
                    </button>
                    <a
                      className="button button-secondary"
                      href={featuredProperty.brochureUrl ?? featuredProperty.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {featuredProperty.brochureUrl ? "View Brochure" : "Open Details"}
                    </a>
                  </div>
                </div>

                <div className="hero-showcase-zones">
                  <p>Popular corridors</p>
                  <div>
                    {heroZones.map((zone) => (
                      <span key={zone}>{zone}</span>
                    ))}
                  </div>
                </div>
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
                      quality={68}
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
    </SiteChrome>
  );
}
