import Image from "next/image";
import { Button } from "@/components/Button";
import { getSiteContent } from "@/lib/data/content";

export async function Hero() {
  const { heroContent, profileContent, siteConfig } = await getSiteContent();
  const trustStats = [
    profileContent.stats.find(([, label]) => label === "Years of Experience"),
    profileContent.stats.find(([, label]) => label === "Closed Sales"),
    profileContent.stats.find(([, label]) => label === "Zillow Rating")
  ].filter(Boolean) as [string, string][];

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/sarasota-area.jpg"
          alt="Sarasota bayfront walkway lined with palm trees at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/20" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-eyebrow text-accent">
          <span className="h-px w-8 bg-accent/60" aria-hidden="true" />
          {siteConfig.brokerage}
        </p>
        <h1 className="mt-6 max-w-3xl font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
          {heroContent.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">{heroContent.subheading}</p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/listings">View Listings</Button>
          <Button href="/contact" variant="ghost">
            Contact Me
          </Button>
        </div>

        <dl className="mt-14 flex flex-wrap gap-x-12 gap-y-6 border-t border-white/15 pt-8">
          {trustStats.map(([value, label]) => (
            <div key={label}>
              <dt className="font-serif text-3xl font-semibold text-white">{value}</dt>
              <dd className="mt-1 text-sm font-medium text-white/70">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
