import Link from "next/link";
import { Logo } from "@/components/site/Logo";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/honorary", label: "Honorary Recognition" },
  { href: "/admissions", label: "Admissions" },
  { href: "/verify", label: "Verify" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gold/30 bg-cream/95 backdrop-blur">
      <div className="border-b border-navy/10 bg-navy text-[11px] uppercase tracking-[0.22em] text-gold-light">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
          <p className="hidden sm:block">Private honorary recognition · not a state-accredited university degree</p>
          <p className="sm:hidden">Honorary recognition · privately conferred</p>
          <div className="flex gap-4">
            <Link href="/student" className="hover:text-white">
              Student Portal
            </Link>
            <Link href="/admin" className="hover:text-white">
              Staff
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4">
        <Logo />
        <nav className="hidden items-center gap-5 text-[13px] font-medium tracking-wide text-navy lg:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-gold-dark">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/apply"
          className="rounded-sm bg-burgundy px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-burgundy/90"
        >
          Apply Now
        </Link>
      </div>
      <nav className="flex gap-4 overflow-x-auto border-t border-gold/20 px-4 py-2 text-xs uppercase tracking-[0.16em] text-navy lg:hidden">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
