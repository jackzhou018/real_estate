import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for my real estate website."
};

export default function TermsPage() {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-eyebrow text-accent">Legal</p>
        <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">Terms of Use</h1>
        <div className="mt-8 space-y-6 leading-8 text-body">
          <p>This website is provided for informational purposes only and does not create a brokerage relationship by itself.</p>
          <p>Property information, pricing, features, and availability may change and should be confirmed directly with me.</p>
          <p>This website does not guarantee availability, pricing, financing terms, or property condition.</p>
          <p>I select featured listings manually, and they do not represent all available homes or live MLS inventory.</p>
          <p>These terms are editable and should be reviewed for your final business practices before launch.</p>
        </div>
      </div>
    </section>
  );
}
