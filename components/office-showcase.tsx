"use client";

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

function getLocalDateString() {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60 * 1000;
  return new Date(now.getTime() - timezoneOffset).toISOString().split("T")[0];
}

export function OfficeShowcase() {
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [capacityFilter, setCapacityFilter] = useState("all");
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [latestInquiry, setLatestInquiry] = useState<Inquiry | null>(null);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);

  const deferredLocation = useDeferredValue(locationFilter);
  const deferredType = useDeferredValue(typeFilter);
  const deferredCapacity = useDeferredValue(capacityFilter);

  const cities = Array.from(new Set(properties.map((property) => property.city)));
  const featuredProperty = properties[0];
  const selectedProperty = properties.find((property) => property.id === selectedPropertyId) ?? null;

  const filteredProperties = properties.filter((property) => {
    const matchesLocation = deferredLocation === "all" || property.city === deferredLocation;
    const matchesType = deferredType === "all" || property.type === deferredType;
    const matchesCapacity =
      deferredCapacity === "all" || property.seats >= Number(deferredCapacity);

    return matchesLocation && matchesType && matchesCapacity;
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
    setCapacityFilter("all");
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
            <p className="eyebrow">Flexible workspaces for growing teams</p>
            <h1>Browse premium office spaces and book the right one through one smart form.</h1>
            <p className="hero-text">
              Explore managed offices, private suites, and enterprise floors across prime business
              districts. Compare seats, location, lease terms, and amenities before you submit a
              booking request.
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
                <strong>42+</strong>
                <span>Ready-to-move offices</span>
              </article>
              <article>
                <strong>8</strong>
                <span>Business districts covered</span>
              </article>
              <article>
                <strong>96%</strong>
                <span>Shortlist satisfaction score</span>
              </article>
            </div>
          </div>

          <aside className="hero-panel" aria-label="Featured workspace">
            <div className="hero-panel-top">
              <span className="pill">Featured listing</span>
              <span className="pill pill-muted">4.9/5 tenant rating</span>
            </div>

            <div className="hero-panel-visual">
              <div className="window-stack" aria-hidden="true">
                {Array.from({ length: 8 }).map((_, index) => (
                  <span key={index} />
                ))}
              </div>

              <div className="hero-property-card">
                <p>{featuredProperty.name}</p>
                <strong>{featuredProperty.type}</strong>
                <span>{featuredProperty.location}</span>
              </div>
            </div>

            <div className="hero-panel-footer">
              <div>
                <small>Starting from</small>
                <strong>{featuredProperty.price}</strong>
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
              <h2>Match your team to the right office</h2>
            </div>
            <p className="section-note">
              Showing {filteredProperties.length} office space
              {filteredProperties.length === 1 ? "" : "s"} based on your current filters.
            </p>
          </div>

          <div className="filter-panel">
            <label>
              Location
              <select value={locationFilter} onChange={(event) => setLocationFilter(event.target.value)}>
                <option value="all">All cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Workspace type
              <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
                <option value="all">All types</option>
                <option value="Managed Office">Managed Office</option>
                <option value="Private Suite">Private Suite</option>
                <option value="Enterprise Floor">Enterprise Floor</option>
                <option value="Coworking Cabin">Coworking Cabin</option>
              </select>
            </label>

            <label>
              Team size
              <select
                value={capacityFilter}
                onChange={(event) => setCapacityFilter(event.target.value)}
              >
                <option value="all">Any size</option>
                <option value="10">10+ seats</option>
                <option value="20">20+ seats</option>
                <option value="40">40+ seats</option>
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
                    <span className="property-badge">{property.type}</span>
                    <div className="property-visual-copy">
                      <small>{property.availability}</small>
                      <strong>{property.area}</strong>
                    </div>
                  </div>

                  <div className="property-body">
                    <div className="property-header">
                      <div>
                        <h3>{property.name}</h3>
                        <p>{property.location}</p>
                      </div>
                      <div className="property-price">
                        <strong>{property.price}</strong>
                        <span>{property.lease}</span>
                      </div>
                    </div>

                    <p className="property-summary">{property.summary}</p>

                    <div className="property-metrics">
                      <article>
                        <strong>{property.seats}</strong>
                        <span>Seats</span>
                      </article>
                      <article>
                        <strong>{property.area}</strong>
                        <span>Area</span>
                      </article>
                      <article>
                        <strong>{property.city}</strong>
                        <span>City</span>
                      </article>
                    </div>

                    <div className="amenity-list">
                      {property.amenities.map((amenity) => (
                        <span key={amenity}>{amenity}</span>
                      ))}
                    </div>

                    <button className="button card-button" type="button" onClick={() => selectProperty(property.id)}>
                      Book this office
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="empty-state">
                <h3>No offices match these filters</h3>
                <p>Reset the filters to see all listed workspaces again.</p>
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
              <h3>Transparent pricing</h3>
              <p>Monthly rent, lease guidance, and move-in timing are visible before you even open the form.</p>
            </article>
            <article>
              <h3>Curated amenities</h3>
              <p>Meeting rooms, reception support, parking, internet, and security are summarized on every card.</p>
            </article>
            <article>
              <h3>Property-aware booking</h3>
              <p>Choose a listing and the booking form automatically remembers the office you want to visit.</p>
            </article>
          </div>
        </section>

        <section className="booking-section" id={bookingSectionId}>
          <div className="booking-card">
            <div className="booking-copy">
              <p className="eyebrow">Book office space</p>
              <h2>Send your workspace request</h2>
              <p>
                Fill out the booking form to arrange a tour, request layout details, and confirm
                availability for your preferred office.
              </p>

              <div className="selected-office-panel">
                <span className="selection-label">Selected property</span>
                {selectedProperty ? (
                  <>
                    <strong>{selectedProperty.name}</strong>
                    <p>
                      {selectedProperty.location} | {selectedProperty.seats} seats | {selectedProperty.price}
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
    </div>
  );
}
