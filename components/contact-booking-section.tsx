"use client";

import { FormEvent, startTransition, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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

function getLocalDateString() {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60 * 1000;
  return new Date(now.getTime() - timezoneOffset).toISOString().split("T")[0];
}

export function ContactBookingSection() {
  const searchParams = useSearchParams();
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [latestInquiry, setLatestInquiry] = useState<Inquiry | null>(null);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);

  const selectedProperty = properties.find((property) => property.id === selectedPropertyId) ?? null;

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

  useEffect(() => {
    const propertyId = searchParams.get("property") ?? "";
    const matchingProperty = properties.find((property) => property.id === propertyId);

    if (matchingProperty) {
      setSelectedPropertyId(matchingProperty.id);
      setStatusMessage(null);
    }
  }, [searchParams]);

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
    <section className="booking-section" id="contact-form">
      <div className="booking-card">
        <div className="booking-copy">
          <p className="eyebrow">Contact our team</p>
          <h2>Send your workspace request</h2>
          <p>
            Share your preferred office type, visit plan, and move-in timeline. We will help you
            shortlist the right space and schedule the next conversation quickly.
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
                <strong>Select an office option</strong>
                <p>Choose a property from the dropdown and we will tailor the enquiry around that location.</p>
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
  );
}
