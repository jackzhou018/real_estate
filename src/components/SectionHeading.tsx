export function SectionHeading({
  eyebrow,
  title,
  children
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      {eyebrow ? <p className="mb-3 text-xs font-bold uppercase tracking-[0.04em] text-primary">{eyebrow}</p> : null}
      <h2 className="text-[28px] font-semibold leading-snug text-ink sm:text-[32px]">{title}</h2>
      {children ? <p className="mt-4 text-base leading-7 text-muted">{children}</p> : null}
    </div>
  );
}
