import Image from "next/image";
import Link from "next/link";
import { Property } from "../data/properties";

type PropertyPreviewGridProps = {
  eyebrow: string;
  title: string;
  note: string;
  properties: Property[];
  id?: string;
};

export function PropertyPreviewGrid({
  eyebrow,
  title,
  note,
  properties,
  id
}: PropertyPreviewGridProps) {
  return (
    <section className="filter-section" id={id}>
      <div className="section-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <p className="section-note">{note}</p>
      </div>

      <div className="property-grid">
        {properties.map((property) => (
          <article className="property-card" key={property.id}>
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
                <Link className="button card-button" href={`/contact?property=${property.id}`}>
                  Book this office
                </Link>
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
        ))}
      </div>
    </section>
  );
}
