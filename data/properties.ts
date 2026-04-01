export type Property = {
  id: string;
  name: string;
  city: string;
  zone: string;
  location: string;
  type:
    | "Tech Park"
    | "Business Park"
    | "IT Park"
    | "Corporate Park"
    | "Commercial Project";
  availability: string;
  brochureLabel: string;
  summary: string;
  amenities: string[];
  imageUrl: string;
  sourceUrl: string;
  brochureUrl?: string;
  skin: "sunset" | "harbor" | "citrine" | "midnight" | "clay" | "grove";
};

export const properties: Property[] = [
  {
    id: "aditya-nexus-tech-park",
    name: "Aditya Nexus Tech Park",
    city: "Indore",
    zone: "Ujjain Highway",
    location: "Indore Ujjain Highway, Luvkush Square",
    type: "Tech Park",
    availability: "Availability on enquiry",
    brochureLabel: "Brochure available",
    summary:
      "A commercial tech-focused project in Indore positioned for teams that want a modern office address with strong highway connectivity.",
    amenities: ["Power backup", "Security", "Internet connection"],
    imageUrl: "https://theofficeonrent.com/wp-content/uploads/2026/03/WhatsApp-Image-2025-12-11-at-1.17.44-PM.jpeg",
    sourceUrl: "https://theofficeonrent.com/aditya-nexus-tech-park/",
    brochureUrl: "https://theofficeonrent.com/wp-content/uploads/2026/02/BVG-Brochure-ANP-A4-2.pdf",
    skin: "sunset"
  },
  {
    id: "nrc-business-park",
    name: "NRC Business Park",
    city: "Indore",
    zone: "MR 10",
    location: "MR 10 Main Road, Indore",
    type: "Business Park",
    availability: "Availability on enquiry",
    brochureLabel: "Brochure available",
    summary:
      "A business park listing on MR 10 suited for companies comparing established commercial corridors in Indore.",
    amenities: ["Power backup", "Security", "Internet connection"],
    imageUrl: "https://theofficeonrent.com/wp-content/uploads/2026/03/WhatsApp-Image-2025-12-11-at-1.17.44-PM.jpeg",
    sourceUrl: "https://theofficeonrent.com/nrc-business-park/",
    brochureUrl: "https://theofficeonrent.com/wp-content/uploads/2026/02/NRC_brochure_detailed-1.pdf",
    skin: "harbor"
  },
  {
    id: "nrk-futurex",
    name: "NRK Futurex",
    city: "Indore",
    zone: "MR 10",
    location: "MR 10 Main Road, Indore",
    type: "Commercial Project",
    availability: "Availability on enquiry",
    brochureLabel: "Brochure available",
    summary:
      "A commercial project in the MR 10 corridor for businesses looking to shortlist office options in an active growth zone.",
    amenities: ["Power backup", "Security", "Internet connection"],
    imageUrl: "https://theofficeonrent.com/wp-content/uploads/2026/03/WhatsApp-Image-2025-12-11-at-1.17.44-PM.jpeg",
    sourceUrl: "https://theofficeonrent.com/nrk-futurex/",
    brochureUrl: "https://theofficeonrent.com/wp-content/uploads/2026/02/NRK-Futurex-1.pdf",
    skin: "citrine"
  },
  {
    id: "nrc-it-park",
    name: "NRC IT Park",
    city: "Indore",
    zone: "MR 10",
    location: "MR10 Road, 800 M Inside, Indore",
    type: "IT Park",
    availability: "Availability on enquiry",
    brochureLabel: "Brochure available",
    summary:
      "An IT park option for companies exploring Indore office space slightly inside the MR 10 stretch with brochure-backed project details.",
    amenities: ["Power backup", "Security", "Internet connection"],
    imageUrl: "https://theofficeonrent.com/wp-content/uploads/2026/03/WhatsApp-Image-2025-12-11-at-2.20.33-PM-1.jpeg",
    sourceUrl: "https://theofficeonrent.com/nrc-it-park/",
    brochureUrl: "https://theofficeonrent.com/wp-content/uploads/2026/02/NRC_IT-PARK_10-SEP-2025.pdf",
    skin: "midnight"
  },
  {
    id: "c21-paradise",
    name: "C21 Paradise",
    city: "Indore",
    zone: "MR 10",
    location: "MR 10 Main Road, Indore",
    type: "Commercial Project",
    availability: "Availability on enquiry",
    brochureLabel: "Brochure available",
    summary:
      "A commercial project on MR 10 for teams that want a recognizable office location and supporting brochure information before booking a visit.",
    amenities: ["Power backup", "Security", "Internet connection"],
    imageUrl: "https://theofficeonrent.com/wp-content/uploads/2026/03/WhatsApp-Image-2025-12-11-at-1.17.44-PM-1.jpeg",
    sourceUrl: "https://theofficeonrent.com/c21-pparadise/",
    brochureUrl: "https://theofficeonrent.com/wp-content/uploads/2026/02/C21-PARADISE-1-1.pdf",
    skin: "clay"
  },
  {
    id: "aditya-gateway",
    name: "Aditya Gateway",
    city: "Indore",
    zone: "MR 10",
    location: "MR 10 Main Road, Indore, Before ISBT",
    type: "Commercial Project",
    availability: "Availability on enquiry",
    brochureLabel: "Brochure available",
    summary:
      "A corridor-facing commercial listing before ISBT that can suit office occupiers wanting strong access and a straightforward enquiry flow.",
    amenities: ["Power backup", "Security", "Internet connection"],
    imageUrl: "https://theofficeonrent.com/wp-content/uploads/2026/03/WhatsApp-Image-2025-12-11-at-1.17.44-PM.jpeg",
    sourceUrl: "https://theofficeonrent.com/aditya-gateway/",
    brochureUrl: "https://theofficeonrent.com/wp-content/uploads/2026/02/Gateway-Booklet.pdf",
    skin: "grove"
  },
  {
    id: "laabham-highlights",
    name: "Laabham Highlights",
    city: "Indore",
    zone: "Super Corridor",
    location: "Super Corridor, MR5 Square, Indore",
    type: "Commercial Project",
    availability: "Availability on enquiry",
    brochureLabel: "Project page available",
    summary:
      "A Super Corridor commercial option for businesses monitoring emerging office micro-markets around MR5 Square in Indore.",
    amenities: ["Power backup", "Security", "Internet connection"],
    imageUrl: "https://theofficeonrent.com/wp-content/uploads/2026/03/WhatsApp-Image-2025-12-11-at-1.17.44-PM.jpeg",
    sourceUrl: "https://theofficeonrent.com/laabham-highlights/",
    skin: "sunset"
  },
  {
    id: "dream-kkh",
    name: "Dream KKH",
    city: "Indore",
    zone: "Super Corridor",
    location: "Plot No. 22, Super Corridor, Indore",
    type: "Commercial Project",
    availability: "Availability on enquiry",
    brochureLabel: "Brochure available",
    summary:
      "A Super Corridor project positioned on a wide main road, useful for companies comparing new commercial supply in Indore.",
    amenities: ["Power backup", "Security", "Internet connection"],
    imageUrl: "https://theofficeonrent.com/wp-content/uploads/2026/03/PLOTNO22-SUPERCORRIDORVIEWS31.jpg",
    sourceUrl: "https://theofficeonrent.com/dream-kkh/",
    brochureUrl:
      "https://theofficeonrent.com/wp-content/uploads/2026/02/DREAM-KKH-CORPORATE-ALL-FLOOR-PLANS-MERGED-2.pdf",
    skin: "harbor"
  },
  {
    id: "skye-corporate-park",
    name: "Skye Corporate Park",
    city: "Indore",
    zone: "Vijay Nagar",
    location: "Pardesipura, Indore (MP) 452010",
    type: "Corporate Park",
    availability: "Availability on enquiry",
    brochureLabel: "Project page available",
    summary:
      "A corporate park listing in Indore for startups and established teams looking for a professional office environment and central-city access.",
    amenities: ["Power backup", "Security", "Internet connection"],
    imageUrl: "https://theofficeonrent.com/wp-content/uploads/2025/05/5cacf83dfb43b7eb6882f6271898b0e05eead724.jpg",
    sourceUrl: "https://theofficeonrent.com/skye-corporate-park/",
    skin: "midnight"
  }
];
