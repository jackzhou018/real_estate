import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Lilian Yang | Real Estate Broker",
    template: "%s | Lilian Yang"
  },
  description: "Real estate guidance for buyers and sellers in [Your City / Region].",
  openGraph: {
    title: "Lilian Yang | Real Estate Broker",
    description: "Local guidance, market insight, and a clear plan from search to closing.",
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
