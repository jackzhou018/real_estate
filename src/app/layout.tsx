import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { getSiteContent } from "@/lib/data/content";
import "./globals.css";

// The whole site reads editable content/listings from the database at request
// time, so admin edits appear immediately. This segment config applies to every
// route nested under the root layout.
export const dynamic = "force-dynamic";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif"
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans"
});

export async function generateMetadata(): Promise<Metadata> {
  const { siteConfig } = await getSiteContent();
  const defaultTitle = `${siteConfig.name} | Sarasota Real Estate Agent`;
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: defaultTitle,
      template: `%s | ${siteConfig.name}`
    },
    description: "Sarasota-area real estate guidance for buyers, sellers, renters, and property management clients.",
    openGraph: {
      title: defaultTitle,
      description: "Local guidance for Sarasota-area homes, rentals, and property management.",
      url: siteConfig.url,
      siteName: `${siteConfig.name} Real Estate`,
      type: "website"
    }
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-cream antialiased">{children}</body>
    </html>
  );
}
