export type Property = {
  id: string;
  name: string;
  city: string;
  location: string;
  type: "Managed Office" | "Private Suite" | "Enterprise Floor" | "Coworking Cabin";
  seats: number;
  area: string;
  price: string;
  availability: string;
  lease: string;
  summary: string;
  amenities: string[];
  skin: "sunset" | "harbor" | "citrine" | "midnight" | "clay" | "grove";
};

export const properties: Property[] = [
  {
    id: "skyline-house",
    name: "Skyline House",
    city: "New Delhi",
    location: "Connaught Place, New Delhi",
    type: "Managed Office",
    seats: 28,
    area: "3,200 sq ft",
    price: "₹ 1.95L / month",
    availability: "Immediate move-in",
    lease: "12 month lock-in",
    summary:
      "A client-ready office with branded reception, leadership cabins, and bright collaboration corners for teams that host often.",
    amenities: ["Reception support", "6-seater boardroom", "Parking", "Power backup"],
    skin: "sunset"
  },
  {
    id: "harbor-square",
    name: "Harbor Square",
    city: "Mumbai",
    location: "BKC, Mumbai",
    type: "Private Suite",
    seats: 16,
    area: "1,900 sq ft",
    price: "₹ 2.40L / month",
    availability: "Available in 10 days",
    lease: "Flexible 9-18 months",
    summary:
      "A polished suite for leadership teams that want privacy, premium visitor experience, and direct access to a shared conference lounge.",
    amenities: ["Visitor management", "Cafeteria", "24/7 access", "Conference lounge"],
    skin: "harbor"
  },
  {
    id: "trade-axis-center",
    name: "Trade Axis Center",
    city: "Hyderabad",
    location: "HITEC City, Hyderabad",
    type: "Enterprise Floor",
    seats: 64,
    area: "7,800 sq ft",
    price: "₹ 4.75L / month",
    availability: "Immediate move-in",
    lease: "24 month lock-in",
    summary:
      "A full-floor workspace built for scale, with training areas, internal townhall space, and a layout designed for growing support teams.",
    amenities: ["Dedicated floor", "Training room", "Server room", "Biometric access"],
    skin: "citrine"
  },
  {
    id: "urban-yard-studios",
    name: "Urban Yard Studios",
    city: "Bengaluru",
    location: "Koramangala, Bengaluru",
    type: "Coworking Cabin",
    seats: 10,
    area: "1,150 sq ft",
    price: "₹ 1.10L / month",
    availability: "This week",
    lease: "Month-to-month option",
    summary:
      "A creative cabin setup with a lively common floor, podcast booth access, and short-term flexibility for product and design teams.",
    amenities: ["Podcast room", "Daily housekeeping", "Shared lounge", "Flexible lease"],
    skin: "midnight"
  },
  {
    id: "civic-crown",
    name: "Civic Crown",
    city: "Noida",
    location: "Sector 62, Noida",
    type: "Managed Office",
    seats: 40,
    area: "4,600 sq ft",
    price: "₹ 2.85L / month",
    availability: "Available in 2 weeks",
    lease: "12 month lock-in",
    summary:
      "A balanced setup for sales and customer operations with a training room, fast commute access, and built-in storage for teams on call.",
    amenities: ["Training room", "Parking", "Visitor lounge", "Plug-and-play furniture"],
    skin: "clay"
  },
  {
    id: "greenline-plaza",
    name: "Greenline Plaza",
    city: "Gurugram",
    location: "MG Road, Gurugram",
    type: "Private Suite",
    seats: 22,
    area: "2,450 sq ft",
    price: "₹ 1.75L / month",
    availability: "Immediate move-in",
    lease: "Flexible 12 months",
    summary:
      "A bright suite with terrace spill-out space, quiet phone booths, and quick access to metro, dining, and after-hours client meeting spots.",
    amenities: ["Terrace access", "Phone booths", "Metro nearby", "Managed reception"],
    skin: "grove"
  }
];
