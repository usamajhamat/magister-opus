import type { Metadata } from "next";
import { Disclaimer, PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About Magister Opus"
        title="Master Work. Meaningful Learning."
        lede="Magister Opus, meaning “Master Work,” is an online school dedicated to advanced learning, professional development, intellectual growth, and recognition of meaningful achievement."
      />
      <article className="mx-auto max-w-3xl space-y-6 px-4 py-14 text-base leading-8">
        <Disclaimer />
        <p>
          We believe education is more than earning a credential. It is about developing knowledge, confidence,
          leadership, creativity, and the ability to create meaningful impact.
        </p>
        <p>
          Magister Opus provides flexible online learning opportunities for professionals, educators, entrepreneurs,
          leaders, and lifelong learners who want to continue growing.
        </p>
        <h2 className="font-display text-3xl text-navy">Our philosophy</h2>
        <p>We believe learning should be:</p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {["Accessible", "Meaningful", "Flexible", "Relevant", "Learner-centered", "Focused on lifelong growth"].map(
            (item) => (
              <li key={item} className="border border-gold/30 bg-white px-4 py-3">
                {item}
              </li>
            ),
          )}
        </ul>
        <h2 className="font-display text-3xl text-navy">Our mission</h2>
        <p>
          To provide accessible and meaningful learning opportunities that empower individuals to deepen their
          knowledge, develop professional expertise, cultivate leadership, and contribute positively to their
          communities and the world.
        </p>
        <h2 className="font-display text-3xl text-navy">Our vision</h2>
        <p>
          To become a globally connected center for lifelong learning, recognized for developing knowledgeable
          professionals, inspiring leaders, advancing scholarship, and celebrating individuals whose work creates
          meaningful impact.
        </p>
        <p className="italic">Our aspiration: a world where learning never stops and meaningful work is recognized.</p>
      </article>
    </>
  );
}
