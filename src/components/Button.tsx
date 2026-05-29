import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "outline" | "inverse" | "ghost";
  disabled?: boolean;
  className?: string;
};

const variants = {
  primary: "bg-primary text-white shadow-soft hover:bg-primaryActive",
  secondary: "bg-ink text-white shadow-soft hover:bg-primaryActive",
  outline: "border border-ink/20 bg-white text-ink hover:border-ink/40 hover:bg-soft",
  // For use on dark backgrounds
  inverse: "bg-white text-ink shadow-soft hover:bg-soft",
  ghost: "border border-white/40 bg-transparent text-white hover:border-white/70 hover:bg-white/10"
};

export function Button({ children, href, type = "button", variant = "primary", disabled, className }: ButtonProps) {
  const classes = cn(
    "inline-flex min-h-12 cursor-pointer items-center justify-center rounded-xl px-6 py-3 text-base font-medium tracking-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} disabled={disabled}>
      {children}
    </button>
  );
}
