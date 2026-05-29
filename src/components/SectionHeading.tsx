export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "center"
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  align?: "center" | "left";
}) {
  const isCenter = align === "center";

  return (
    <div className={`mb-12 max-w-3xl ${isCenter ? "mx-auto text-center" : "mx-0 text-left"}`}>
      {eyebrow ? (
        <p
          className={`mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-eyebrow text-accent ${
            isCenter ? "justify-center" : "justify-start"
          }`}
        >
          {isCenter ? <span className="h-px w-6 bg-accent/50" aria-hidden="true" /> : null}
          {eyebrow}
          <span className="h-px w-6 bg-accent/50" aria-hidden="true" />
        </p>
      ) : null}
      <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">{title}</h2>
      {children ? <p className="mt-5 text-base leading-7 text-muted sm:text-lg">{children}</p> : null}
    </div>
  );
}
