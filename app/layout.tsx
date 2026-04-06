import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Office On Rent | Browse and Book Office Space",
  description:
    "A modern real estate website where teams can explore office properties and submit a booking request for the right workspace."
};

export const viewport: Viewport = {
  width: 1240
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
