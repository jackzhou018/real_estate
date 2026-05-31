"use client";

import { useState } from "react";
import { NavLink } from "@/components/NavLink";

const navItems = [
  ["Home", "/"],
  ["Profile", "/profile"],
  ["Newsletter", "/newsletter"],
  ["Listings", "/listings"],
  ["Contact", "/contact"]
];

export function MobileMenu({ phone }: { phone: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-ink/15 bg-white text-ink transition-colors hover:bg-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        {open ? (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
          </svg>
        )}
      </button>

      {open ? (
        <div
          id="mobile-nav"
          className="absolute left-4 right-4 top-[4.5rem] rounded-2xl border border-hairline bg-white p-5 shadow-lift"
        >
          <nav aria-label="Mobile" className="grid gap-1">
            {navItems.map(([label, href]) => (
              <NavLink key={href} href={href} onClick={() => setOpen(false)}>
                <span className="block rounded-lg py-2.5 text-base">{label}</span>
              </NavLink>
            ))}
          </nav>
          <a
            href={`tel:${phone.replace(/[^\d+]/g, "")}`}
            className="mt-4 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primaryActive"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
            Call {phone}
          </a>
        </div>
      ) : null}
    </div>
  );
}
