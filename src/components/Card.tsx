import { cn } from "@/lib/utils";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("rounded-[14px] border border-hairline bg-white p-6", className)}>{children}</div>;
}
