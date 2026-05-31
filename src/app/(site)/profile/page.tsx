import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { SectionHeading } from "@/components/SectionHeading";
import { getSiteContent } from "@/lib/data/content";

export async function generateMetadata(): Promise<Metadata> {
  const { siteConfig } = await getSiteContent();
  return {
    title: "Profile",
    description: `I'm ${siteConfig.name}, a Real Estate Agent with ${siteConfig.brokerage} in Sarasota, Florida.`
  };
}

export default async function ProfilePage() {
  const { profileContent, siteConfig } = await getSiteContent();
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Profile" title={profileContent.title}>
          {profileContent.subtitle} · {profileContent.location}
        </SectionHeading>

        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-3xl border border-hairline bg-white p-2 shadow-soft">
              <Image
                src="/images/profile.png"
                alt="Lilian Yang, Sarasota real estate agent"
                width={900}
                height={1100}
                className="w-full rounded-2xl object-cover"
                priority
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button href="/contact?reason=General%20question" className="flex-1">
                Schedule a Consultation
              </Button>
              <Button href="/listings" variant="outline" className="flex-1">
                View Listings
              </Button>
            </div>
          </div>

          <div className="grid gap-6">
            <Card>
              <p className="text-xs font-semibold uppercase tracking-eyebrow text-accent">{siteConfig.brokerage}</p>
              <h2 className="mt-3 font-serif text-2xl font-semibold leading-snug text-ink">{siteConfig.market}</h2>
              <p className="mt-4 leading-8 text-body">{profileContent.bio}</p>
            </Card>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
              {profileContent.stats.map(([value, label]) => (
                <Card key={label} className="p-5">
                  <p className="font-serif text-2xl font-semibold text-ink sm:text-3xl">{value}</p>
                  <p className="mt-2 text-sm leading-5 text-muted">{label}</p>
                </Card>
              ))}
            </div>

            <Card>
              <h2 className="font-serif text-xl font-semibold text-ink">Specialties & Service Areas</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {profileContent.specialties.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-hairline bg-soft px-4 py-2 text-sm font-medium text-ink"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
