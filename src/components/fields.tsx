import { cn } from "@/lib/utils";

const base =
  "mt-2 min-h-14 w-full rounded-lg border border-hairline bg-white px-3.5 py-3.5 text-base text-ink outline-none transition placeholder:text-muted focus:border-ink focus:ring-0";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(base, props.className)} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(base, props.className)} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(base, "min-h-36", props.className)} />;
}

export function Checkbox(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} type="checkbox" className={cn("mt-1 h-4 w-4 rounded border-hairline text-primary focus:ring-ink", props.className)} />;
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
    <label className="block text-sm font-medium text-muted">
      {label}
      {children}
      {error ? <span className="mt-1 block text-sm font-medium text-red-700">{error}</span> : null}
    </label>
  );
}
