export function PageHero({
  kicker,
  title,
  lede,
}: {
  kicker?: string;
  title: string;
  lede?: string;
}) {
  return (
    <section className="border-b border-gold/25 bg-[linear-gradient(180deg,#1B3654_0%,#122033_100%)] px-4 py-16 text-parchment">
      <div className="mx-auto max-w-4xl text-center">
        {kicker && <p className="ornament text-[11px] text-gold">{kicker}</p>}
        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{title}</h1>
        {lede && <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-parchment/80">{lede}</p>}
      </div>
    </section>
  );
}

export function Disclaimer() {
  return (
    <p className="rounded-sm border border-gold/40 bg-gold-light/30 px-4 py-3 text-sm leading-6 text-navy">
      Magister Opus issues private honorary recognition and professional distinction. This is not a
      state-accredited university degree and is distinct from an earned doctoral credential.
    </p>
  );
}
