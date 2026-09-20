import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="ornament text-[11px] text-gold-dark">404</p>
      <h1 className="mt-3 font-display text-4xl text-navy">This page is not in the register</h1>
      <Link href="/" className="mt-6 inline-block text-sm uppercase tracking-[0.16em] text-burgundy">
        Return home
      </Link>
    </section>
  );
}
