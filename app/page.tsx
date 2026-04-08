import type { Metadata } from "next";
import { OfficeShowcase } from "../components/office-showcase";

const siteUrl = "https://theofficeonrent.com";

export const metadata: Metadata = {
  title: "Commercial Office, Showroom & Coworking Spaces In Indore",
  description:
    "Book free consultation for office spaces, showrooms, shops, coworking and commercial investment opportunities in Indore with zero-brokerage options.",
  alternates: {
    canonical: "/"
  }
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "The Office On Rent Workspace",
  url: siteUrl,
  logo: `${siteUrl}/logo-wide.png`,
  image: [`${siteUrl}/logo-wide.png`, `${siteUrl}/header-skyline.png`],
  description:
    "The Office On Rent Workspace helps businesses find furnished and non-furnished office spaces, showrooms, shops, coworking spaces and commercial investment options in Indore.",
  telephone: "+91-9111832003",
  email: "theofficeonrent.ws@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Gravity Mall, Plot-27, Mechanic Nagar, Scheme No 54",
    addressLocality: "Indore",
    addressRegion: "Madhya Pradesh",
    postalCode: "452011",
    addressCountry: "IN"
  },
  areaServed: [
    {
      "@type": "City",
      name: "Indore"
    },
    {
      "@type": "AdministrativeArea",
      name: "Madhya Pradesh"
    }
  ],
  serviceType: [
    "Office Space Furnished",
    "Office Space Non-Furnished",
    "Showrooms / Shops",
    "Commercial Investment",
    "Coworking Spaces"
  ],
  sameAs: [`https://wa.me/919111832003`]
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <OfficeShowcase />
    </>
  );
}
