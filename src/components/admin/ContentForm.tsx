"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SiteContent } from "@/lib/data/content";

const inputClass =
  "mt-1 w-full rounded-xl border border-hairline bg-cream px-3 py-2 text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent/30";
const labelClass = "block text-sm font-medium text-ink";

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-muted">{hint}</span> : null}
    </label>
  );
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-hairline bg-white p-6">
      <h2 className="font-serif text-lg font-semibold text-ink">{title}</h2>
      {description ? <p className="mb-4 mt-1 text-sm text-muted">{description}</p> : <div className="mb-4" />}
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function ContentForm({ initialContent }: { initialContent: SiteContent }) {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  // Generic deep-ish updater for a known top-level section.
  function setSection<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setContent((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }
  function setField<K extends keyof SiteContent, F extends keyof SiteContent[K]>(
    section: K,
    field: F,
    value: SiteContent[K][F]
  ) {
    setContent((current) => ({ ...current, [section]: { ...current[section], [field]: value } }));
    setSaved(false);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);

    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content)
    });

    if (response.ok) {
      setSaved(true);
      router.refresh();
    } else {
      const data = await response.json().catch(() => ({}));
      setError(data.error || "Could not save content.");
    }
    setSaving(false);
  }

  const { siteConfig, heroContent, profileContent, clientHighlights, newsletterContent, contactContent } = content;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>
      ) : null}

      <Section title="Contact &amp; identity" description="Used across the header, footer, and contact details.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name">
            <input className={inputClass} value={siteConfig.name} onChange={(e) => setField("siteConfig", "name", e.target.value)} />
          </Field>
          <Field label="Role">
            <input className={inputClass} value={siteConfig.role} onChange={(e) => setField("siteConfig", "role", e.target.value)} />
          </Field>
          <Field label="Brokerage">
            <input className={inputClass} value={siteConfig.brokerage} onChange={(e) => setField("siteConfig", "brokerage", e.target.value)} />
          </Field>
          <Field label="Market">
            <input className={inputClass} value={siteConfig.market} onChange={(e) => setField("siteConfig", "market", e.target.value)} />
          </Field>
          <Field label="Contact email" hint="Where contact-form notifications go">
            <input className={inputClass} value={siteConfig.email} onChange={(e) => setField("siteConfig", "email", e.target.value)} />
          </Field>
          <Field label="Public email" hint="Shown on the site">
            <input className={inputClass} value={siteConfig.publicEmail} onChange={(e) => setField("siteConfig", "publicEmail", e.target.value)} />
          </Field>
          <Field label="Phone">
            <input className={inputClass} value={siteConfig.phone} onChange={(e) => setField("siteConfig", "phone", e.target.value)} />
          </Field>
          <Field label="Office">
            <input className={inputClass} value={siteConfig.office} onChange={(e) => setField("siteConfig", "office", e.target.value)} />
          </Field>
          <Field label="License">
            <input className={inputClass} value={siteConfig.license} onChange={(e) => setField("siteConfig", "license", e.target.value)} />
          </Field>
          <Field label="Service area">
            <input className={inputClass} value={siteConfig.serviceArea} onChange={(e) => setField("siteConfig", "serviceArea", e.target.value)} />
          </Field>
        </div>
      </Section>

      <Section title="Homepage hero">
        <Field label="Headline">
          <textarea rows={2} className={inputClass} value={heroContent.headline} onChange={(e) => setField("heroContent", "headline", e.target.value)} />
        </Field>
        <Field label="Subheading">
          <textarea rows={3} className={inputClass} value={heroContent.subheading} onChange={(e) => setField("heroContent", "subheading", e.target.value)} />
        </Field>
      </Section>

      <Section title="Profile / about">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Title">
            <input className={inputClass} value={profileContent.title} onChange={(e) => setField("profileContent", "title", e.target.value)} />
          </Field>
          <Field label="Subtitle">
            <input className={inputClass} value={profileContent.subtitle} onChange={(e) => setField("profileContent", "subtitle", e.target.value)} />
          </Field>
          <Field label="Location">
            <input className={inputClass} value={profileContent.location} onChange={(e) => setField("profileContent", "location", e.target.value)} />
          </Field>
        </div>
        <Field label="Bio">
          <textarea rows={5} className={inputClass} value={profileContent.bio} onChange={(e) => setField("profileContent", "bio", e.target.value)} />
        </Field>
        <Field label="Stats" hint='One per line, format: "value | label" (e.g. "11 | Years of Experience")'>
          <textarea
            rows={6}
            className={inputClass}
            value={profileContent.stats.map(([value, label]) => `${value} | ${label}`).join("\n")}
            onChange={(e) =>
              setField(
                "profileContent",
                "stats",
                e.target.value
                  .split("\n")
                  .map((line) => line.split("|").map((part) => part.trim()))
                  .filter((parts) => parts[0])
                  .map((parts) => [parts[0] ?? "", parts[1] ?? ""] as [string, string])
              )
            }
          />
        </Field>
        <Field label="Specialties" hint="One per line">
          <textarea
            rows={6}
            className={inputClass}
            value={profileContent.specialties.join("\n")}
            onChange={(e) => setField("profileContent", "specialties", e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
          />
        </Field>
      </Section>

      <Section title="Client highlights" description="Short testimonial lines shown on the site.">
        <Field label="Highlights" hint="One per line">
          <textarea
            rows={4}
            className={inputClass}
            value={clientHighlights.join("\n")}
            onChange={(e) => setSection("clientHighlights", e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
          />
        </Field>
      </Section>

      <Section title="Newsletter &amp; contact intros">
        <Field label="Newsletter intro">
          <textarea rows={3} className={inputClass} value={newsletterContent.intro} onChange={(e) => setField("newsletterContent", "intro", e.target.value)} />
        </Field>
        <Field label="Contact intro">
          <textarea rows={3} className={inputClass} value={contactContent.intro} onChange={(e) => setField("contactContent", "intro", e.target.value)} />
        </Field>
      </Section>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primaryActive disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save content"}
        </button>
        {saved ? <span className="text-sm font-medium text-green-700">Saved. Changes are live.</span> : null}
      </div>
    </form>
  );
}
