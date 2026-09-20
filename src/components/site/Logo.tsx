import Link from "next/link";
import { cn } from "@/lib/utils";

export function Crest({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 72" className={cn("text-gold", className)} aria-hidden="true">
      <circle cx="36" cy="36" r="33" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="36" cy="36" r="27" fill="none" stroke="#1B3654" strokeWidth="0.8" />
      <path
        d="M36 16l4.2 8.6 9.5 1.4-6.9 6.7 1.6 9.4L36 37.8 27.6 42.1l1.6-9.4-6.9-6.7 9.5-1.4L36 16z"
        fill="#1B3654"
      />
      <path d="M22 48c4.8 6 10.2 8.5 14 8.5S45.2 54 50 48" fill="none" stroke="#B8954A" strokeWidth="1.4" />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 text-navy">
      <Crest className={compact ? "h-9 w-9" : "h-12 w-12"} />
      <span className="leading-tight">
        <span className="block font-display text-xl tracking-[0.22em] sm:text-2xl">MAGISTER OPUS</span>
        {!compact && (
          <span className="hidden text-[10px] uppercase tracking-[0.28em] text-gold-dark sm:block">
            Master Work
          </span>
        )}
      </span>
    </Link>
  );
}
