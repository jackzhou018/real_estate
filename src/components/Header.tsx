import Link from "next/link";
import { MobileMenu } from "@/components/MobileMenu";
import { NavLink } from "@/components/NavLink";
import { siteConfig } from "@/lib/site";

const navItems = [
  ["Profile", "/profile"],
  ["Newsletter", "/newsletter"],
  ["Listings", "/listings"],
  ["Contact", "/contact"]
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="leading-tight">
          <span className="block text-lg font-semibold text-primary">{siteConfig.name}</span>
          <span className="text-sm text-muted">{siteConfig.role}</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map(([label, href]) => (
            <NavLink key={href} href={href}>
              {label}
            </NavLink>
          ))}
        </nav>
        <MobileMenu />
      </div>
    </header>
  );
}
