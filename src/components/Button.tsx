import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  className?: string;
};

const variants = {
  primary: "bg-primary text-white hover:bg-primaryActive",
  secondary: "bg-ink text-white hover:bg-body",
  outline: "border border-ink bg-white text-ink hover:bg-soft"
};

export function Button({ children, href, type = "button", variant = "primary", disabled, className }: ButtonProps) {
  const classes = cn(
    "inline-flex min-h-12 items-center justify-center rounded-lg px-6 py-3 text-base font-medium transition focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#ffd1da]",
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
