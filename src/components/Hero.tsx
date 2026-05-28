import Image from "next/image";
import { Button } from "@/components/Button";
import { heroContent, siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[0.95fr_1.05fr] md:items-center lg:px-8 lg:py-16">
        <div>
          <p className="mb-4 text-sm font-medium text-muted">
            {siteConfig.name}, {siteConfig.brokerage}
          </p>
          <h1 className="max-w-3xl text-[34px] font-semibold leading-tight text-ink sm:text-[44px] lg:text-[52px]">
            {heroContent.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-body">
            {heroContent.subheading}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/listings">View Listings</Button>
            <Button href="/contact" variant="outline">
              Contact Lilian
            </Button>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[20px] bg-soft p-3">
          <div className="relative grid aspect-[4/3] place-items-end overflow-hidden rounded-[14px] p-6">
            <Image
              src="/images/sarasota-area.jpg"
              alt="Sarasota bayfront walkway with palm trees"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
            <div className="relative w-full rounded-[14px] border border-white/40 bg-white/95 p-5 shadow-soft">
              <p className="text-sm font-medium text-muted">Featured Market Area</p>
              <p className="mt-2 text-2xl font-semibold text-ink">{siteConfig.market}</p>
              <p className="mt-3 leading-7 text-body">Buying, selling, rentals, and property management across Sarasota-area communities.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
