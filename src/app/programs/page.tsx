import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer, PageHero } from "@/components/site/PageHero";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Programs" };
export const dynamic = "force-dynamic";

const MASTERS = [
  "Master of Education",
  "Master of Business Administration",
  "Master of Arts",
  "Master of Public Administration",
  "Master of English Language Education",
  "Master of Information Technology",
  "Other specialized programs",
];

export default async function ProgramsPage() {
  const courses = await prisma.course.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <>
      <PageHero
        kicker="Academic programs"
        title="Advance your knowledge. Strengthen your expertise."
        lede="Magister Opus offers master's-level learning overviews and eight live honorary recognition courses."
      />
      <div className="mx-auto max-w-5xl space-y-12 px-4 py-14">
        <Disclaimer />
        <section>
          <h2 className="font-display text-3xl text-navy">Masteral programs</h2>
          <p className="mt-3 max-w-3xl leading-8">
            Magister Opus offers master&apos;s-level learning opportunities designed for professionals and lifelong
            learners seeking advanced education. Each future program page will explain curriculum, requirements,
            learning format, duration, assessment, and credential awarded. These catalog pages are overview-only in
            this first release.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {MASTERS.map((name) => (
              <li key={name} className="border border-gold/30 bg-white px-4 py-3">
                {name}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-3xl text-navy">Honorary recognition courses</h2>
          <p className="mt-3 max-w-3xl leading-8">
            These eight courses are open for application. Each recognizes meaningful achievement rather than
            completion of a conventional degree program.
          </p>
          <div className="mt-8 grid gap-5">
            {courses.map((course) => (
              <article key={course.id} className="border border-gold/30 bg-white p-6 shadow-card">
                <p className="text-xs uppercase tracking-[0.2em] text-gold-dark">Course 0{course.sortOrder}</p>
                <h3 className="mt-2 font-display text-2xl text-navy">{course.title}</h3>
                <p className="mt-3 leading-7 text-ink/80">{course.description}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={`/programs/${course.slug}`}
                    className="text-xs uppercase tracking-[0.16em] text-navy underline"
                  >
                    Course details
                  </Link>
                  <Link
                    href={`/apply?course=${course.slug}`}
                    className="rounded-sm bg-burgundy px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white"
                  >
                    Apply Now
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
