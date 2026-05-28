import { Button } from "@/components/Button";

export function CTASection({
  title,
  text,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel
}: {
  title: string;
  text: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="border-t border-hairline bg-white py-16">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
        <div>
          <h2 className="text-[28px] font-semibold leading-snug text-ink">{title}</h2>
          <p className="mt-3 max-w-2xl leading-7 text-muted">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href={primaryHref}>{primaryLabel}</Button>
          {secondaryHref && secondaryLabel ? (
            <Button href={secondaryHref} variant="outline">
              {secondaryLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
