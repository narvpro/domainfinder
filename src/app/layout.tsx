import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DomainFinder – Find Trending Available Domains",
  description: "Discover available domains inspired by trending businesses, social media, and viral niches — with side-by-side registrar pricing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
