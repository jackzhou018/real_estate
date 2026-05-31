"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs: [string, string][] = [
  ["Listings", "/admin"],
  ["Page content", "/admin/content"]
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="border-b border-hairline bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-6">
          <span className="font-serif text-lg font-semibold text-ink">Admin</span>
          <nav className="flex gap-1">
            {tabs.map(([label, href]) => {
              const active =
                href === "/admin"
                  ? pathname === "/admin" || pathname.startsWith("/admin/listings")
                  : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active ? "bg-soft text-ink" : "text-muted hover:text-ink"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" target="_blank" className="text-sm font-medium text-muted hover:text-ink">
            View site ↗
          </Link>
          <button
            type="button"
            onClick={logout}
            className="rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-soft"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
