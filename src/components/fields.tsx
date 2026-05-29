import { cn } from "@/lib/utils";

const base =
  "mt-2 min-h-14 w-full rounded-xl border border-hairline bg-white px-4 py-3.5 text-base text-ink outline-none transition-colors duration-200 placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/20";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(base, props.className)} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(base, "cursor-pointer appearance-none bg-no-repeat pr-10", props.className)} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235C6470' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundPosition: "right 0.85rem center", backgroundSize: "1.1rem" }} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(base, "min-h-36 leading-7", props.className)} />;
}

export function Checkbox(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      type="checkbox"
      className={cn(
        "mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-hairline text-primary focus:ring-2 focus:ring-primary/30 focus:ring-offset-0",
        props.className
      )}
    />
  );
}

export function Field({
  label,
  children,
  error
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="block text-sm font-semibold text-ink">
      {label}
      {children}
      {error ? <span className="mt-1 block text-sm font-medium text-red-700">{error}</span> : null}
    </label>
  );
}
