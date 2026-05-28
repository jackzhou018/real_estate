import type { Metadata } from "next";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your message has been sent to Lilian Yang."
};

export default function ThankYouPage() {
  return (
    <section className="bg-soft py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-[34px] font-semibold leading-tight text-ink">Thank you. Your message has been sent.</h1>
        <p className="mt-5 text-lg leading-8 text-muted">Lilian will review your message and follow up with a clear next step.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/">Back to Home</Button>
          <Button href="/listings" variant="outline">
            View Listings
          </Button>
        </div>
      </div>
    </section>
  );
}
