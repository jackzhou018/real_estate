import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Lilian Yang | Sarasota Real Estate Agent",
    template: "%s | Lilian Yang"
  },
  description: "Sarasota-area real estate guidance for buyers, sellers, renters, and property management clients.",
  openGraph: {
    title: "Lilian Yang | Sarasota Real Estate Agent",
    description: "Local guidance for Sarasota-area homes, rentals, and property management.",
    url: siteConfig.url,
    siteName: "Lilian Yang Real Estate",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
