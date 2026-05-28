"use client";

import { useState } from "react";
import { NavLink } from "@/components/NavLink";

const navItems = [
  ["Profile", "/profile"],
  ["Newsletter", "/newsletter"],
  ["Listings", "/listings"],
  ["Contact", "/contact"]
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label="Toggle navigation menu"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-white text-ink"
      >
        <span className="sr-only">Menu</span>
        <span className="block h-4 w-5 border-y-2 border-ink" />
      </button>
      {open ? (
        <div className="absolute left-4 right-4 top-16 rounded-[20px] border border-hairline bg-white p-5 shadow-soft">
          <nav className="grid gap-4">
            {navItems.map(([label, href]) => (
              <NavLink key={href} href={href} onClick={() => setOpen(false)}>
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
