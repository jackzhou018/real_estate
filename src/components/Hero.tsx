import { Button } from "@/components/Button";

export function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[0.95fr_1.05fr] md:items-center lg:px-8 lg:py-16">
        <div>
          <p className="mb-4 text-sm font-medium text-muted">Lilian Yang, Real Estate Broker</p>
          <h1 className="max-w-3xl text-[34px] font-semibold leading-tight text-ink sm:text-[44px] lg:text-[52px]">
            Thoughtful real estate guidance for the way you want to live next.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-body">
            Local guidance, market insight, and a clear plan from search to closing.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact">Contact Lilian</Button>
            <Button href="/listings" variant="outline">
              View Featured Listings
            </Button>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[20px] bg-soft p-3">
          <div className="grid aspect-[4/3] place-items-end overflow-hidden rounded-[14px] bg-[linear-gradient(135deg,#fff7f8_0%,#f7f7f7_52%,#ffffff_100%)] p-6">
            <div className="w-full rounded-[14px] border border-hairline bg-white/95 p-5 shadow-soft">
              <p className="text-sm font-medium text-muted">Featured Market Area</p>
              <p className="mt-2 text-2xl font-semibold text-ink">[Your City / Region]</p>
              <p className="mt-3 leading-7 text-body">A warm, practical starting point for buyers and sellers planning their next move.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
