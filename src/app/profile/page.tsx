import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { SectionHeading } from "@/components/SectionHeading";
import { profileContent, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Profile",
  description: `Meet Lilian Yang, Real Estate Agent with ${siteConfig.brokerage} in Sarasota, Florida.`
};

export default function ProfilePage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Profile" title={profileContent.title}>
          {profileContent.subtitle} · {profileContent.location}
        </SectionHeading>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="rounded-[20px] bg-soft p-3">
            <Image
              src="/images/profile-placeholder.svg"
              alt="Lilian Yang profile placeholder"
              width={900}
              height={1100}
              className="rounded-[14px]"
            />
          </div>
          <div className="grid gap-6">
            <Card className="transition hover:shadow-soft">
              <p className="text-sm font-medium text-muted">{siteConfig.brokerage}</p>
              <h2 className="mt-2 text-2xl font-semibold text-ink">{siteConfig.market}</h2>
              <p className="mt-4 leading-8 text-body">{profileContent.bio}</p>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {profileContent.stats.map(([value, label]) => (
                <Card key={label} className="p-5 transition hover:shadow-soft">
                  <p className="text-2xl font-semibold text-ink">{value}</p>
                  <p className="mt-2 text-sm leading-5 text-muted">{label}</p>
                </Card>
              ))}
            </div>

            <Card>
              <h2 className="text-xl font-semibold text-ink">Specialties & Service Areas</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {profileContent.specialties.map((item) => (
                  <span key={item} className="rounded-full border border-hairline bg-white px-4 py-2 text-sm font-medium text-ink">
                    {item}
                  </span>
                ))}
              </div>
            </Card>

            <div className="flex flex-wrap gap-3">
              <Button href="/contact?reason=General%20question">Schedule a Consultation</Button>
              <Button href="/listings" variant="outline">
                View Listings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
