import Link from "next/link";
import { Crest } from "@/components/site/Logo";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/admissions", label: "Admissions" },
  { href: "/honorary", label: "Honorary Recognition" },
  { href: "/faculty", label: "Faculty" },
  { href: "/research", label: "Research" },
  { href: "/support", label: "Student Support" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/verify", label: "Verify" },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-gold/30 bg-navy-deep text-parchment">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Crest className="h-12 w-12 text-gold" />
            <div>
              <p className="font-display text-2xl tracking-[0.2em]">MAGISTER OPUS</p>
              <p className="text-sm text-gold-light">Master Work. Master Knowledge. Make an Impact.</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-parchment/80">
            Magister Opus confers private honorary recognition for meaningful professional achievement. Certificates
            are privately conferred distinctions, not state-accredited university degrees.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-gold">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-gold-light">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-gold">Contact</p>
          <p className="mt-4 text-sm leading-7">
            Email:{" "}
            <a className="underline decoration-gold/50" href="mailto:info@magisteropus.site">
              info@magisteropus.site
            </a>
            <br />
            Web: www.magisteropus.site
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-xs uppercase tracking-[0.18em] text-gold-light">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Use</Link>
            <Link href="/academic-policies">Academic Policies</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-parchment/60">
        © {new Date().getFullYear()} Magister Opus. Honorary recognition, privately conferred.
      </div>
    </footer>
  );
}
