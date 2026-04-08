import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://theofficeonrent.com";
const defaultTitle = "Office Space For Rent In Indore | Furnished Offices, Showrooms & Coworking";
const defaultDescription =
  "Find furnished and non-furnished office spaces, showrooms, shops, coworking spaces and commercial investment options in Indore with The Office On Rent Workspace.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | The Office On Rent Workspace"
  },
  description: defaultDescription,
  keywords: [
    "office space in indore",
    "office on rent indore",
    "furnished office space indore",
    "non furnished office space indore",
    "showroom for rent indore",
    "shop for rent indore",
    "coworking space indore",
    "commercial investment indore"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: defaultTitle,
    description: defaultDescription,
    siteName: "The Office On Rent Workspace",
    locale: "en_IN",
    images: [
      {
        url: "/logo-wide.png",
        width: 1000,
        height: 490,
        alt: "The Office On Rent Workspace logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/logo-wide.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
