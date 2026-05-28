import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for Lilian Yang's real estate website."
};

export default function TermsPage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-[34px] font-semibold leading-tight text-ink">Terms of Use</h1>
        <div className="mt-8 space-y-6 leading-8 text-body">
          <p>This website is provided for informational purposes only and does not create a brokerage relationship by itself.</p>
          <p>Property information, pricing, features, and availability may change and should be confirmed directly with Lilian Yang.</p>
          <p>The website does not guarantee availability, pricing, financing terms, or property condition.</p>
          <p>Featured listings are selected manually and do not represent all available homes or live MLS inventory.</p>
          <p>These terms are editable and should be reviewed for your final business practices before launch.</p>
        </div>
      </div>
    </section>
  );
}
