import type { Metadata } from "next";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your message has been sent."
};

export default function ThankYouPage() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-soft text-primary">
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </span>
        <h1 className="mt-6 font-serif text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
          Thank you. Your message has been sent.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">I&rsquo;ll review your message and follow up with a clear next step.</p>
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
