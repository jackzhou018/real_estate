import { Button } from "@/components/Button";

export function CTASection({
  title,
  text,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  variant = "light"
}: {
  title: string;
  text: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";

  return (
    <section className={isDark ? "bg-ink" : "border-t border-hairline bg-cream"}>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div
          className={
            isDark
              ? "flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"
              : "flex flex-col items-start justify-between gap-8 rounded-3xl border border-hairline bg-white p-8 shadow-soft md:flex-row md:items-center md:p-10"
          }
        >
          <div className="max-w-2xl">
            <h2
              className={`font-serif text-2xl font-semibold leading-tight tracking-tight sm:text-3xl ${
                isDark ? "text-white" : "text-ink"
              }`}
            >
              {title}
            </h2>
            <p className={`mt-3 leading-7 ${isDark ? "text-white/75" : "text-muted"}`}>{text}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={primaryHref} variant={isDark ? "inverse" : "primary"}>
              {primaryLabel}
            </Button>
            {secondaryHref && secondaryLabel ? (
              <Button href={secondaryHref} variant={isDark ? "ghost" : "outline"}>
                {secondaryLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
