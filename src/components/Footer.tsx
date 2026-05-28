import Link from "next/link";
import { siteConfig } from "@/lib/site";

const links = [
  ["Home", "/"],
  ["Profile", "/profile"],
  ["Newsletter", "/newsletter"],
  ["Listings", "/listings"],
  ["Contact", "/contact"],
  ["Privacy", "/privacy"],
  ["Terms", "/terms"]
];

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-white text-ink">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.3fr_1fr] lg:px-8">
        <div>
          <p className="text-xl font-semibold">{siteConfig.name}</p>
          <p className="mt-1 text-muted">{siteConfig.role}</p>
          <p className="mt-4 text-sm text-muted">Email: {siteConfig.email}</p>
          <p className="mt-6 max-w-2xl text-sm leading-6 text-muted">
            This website is for informational purposes only. Availability, pricing, and property details are subject to change.
            Contact Lilian Yang for the most current information.
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="text-ink hover:underline">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
