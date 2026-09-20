import Link from "next/link";
import { Disclaimer } from "@/components/site/PageHero";
import { Crest } from "@/components/site/Logo";
import { RECOGNITION_COURSES } from "@/lib/courses";

const VALUES = [
  { letter: "M", title: "Mastery", text: "We pursue continuous learning and improvement." },
  { letter: "A", title: "Accessibility", text: "We strive to make learning opportunities accessible to diverse learners." },
  { letter: "G", title: "Growth", text: "We encourage intellectual, professional, and personal development." },
  { letter: "I", title: "Integrity", text: "We value honesty, responsibility, and ethical conduct." },
  { letter: "S", title: "Scholarship", text: "We encourage research, critical thinking, and intellectual curiosity." },
  { letter: "T", title: "Transformation", text: "We believe education can create meaningful change." },
  { letter: "E", title: "Excellence", text: "We pursue high standards in learning and service." },
  { letter: "R", title: "Recognition", text: "We celebrate meaningful achievement and contribution." },
];

const WHY = [
  { n: "01", t: "Online learning", d: "Learn through a flexible digital environment." },
  { n: "02", t: "Advanced education", d: "Develop deeper knowledge and professional expertise." },
  { n: "03", t: "Flexible", d: "Designed to accommodate working professionals and lifelong learners." },
  { n: "04", t: "Professional growth", d: "Develop skills and knowledge relevant to your goals." },
  { n: "05", t: "Global perspective", d: "Connect with ideas, people, and opportunities beyond geographical boundaries." },
  { n: "06", t: "Lifelong learning", d: "Your education doesn't have to stop after your first degree." },
  { n: "07", t: "Supportive community", d: "Learn, connect, collaborate, and grow with other learners." },
  { n: "08", t: "Recognition", d: "Meaningful accomplishments deserve meaningful recognition." },
];

const AUDIENCE = [
  { t: "Educators", d: "Expand your knowledge and professional expertise." },
  { t: "Professionals", d: "Continue your education while building your career." },
  { t: "Entrepreneurs", d: "Develop knowledge in leadership, business, and management." },
  { t: "Leaders", d: "Strengthen your ability to create meaningful impact." },
  { t: "Scholars", d: "Explore research, knowledge, and intellectual development." },
  { t: "Lifelong learners", d: "Because learning never has to stop." },
];

const JOURNEY = [
  { n: "1", t: "Explore", d: "Choose a program aligned with your goals." },
  { n: "2", t: "Apply", d: "Submit your application and required documents." },
  { n: "3", t: "Enroll", d: "Complete the enrollment process." },
  { n: "4", t: "Learn", d: "Access your online learning environment." },
  { n: "5", t: "Complete", d: "Meet the academic requirements of your program." },
  { n: "6", t: "Achieve", d: "Complete your program or receive appropriate recognition." },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-deep px-4 py-24 text-parchment">
        <div className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, #B8954A 0, transparent 28%), radial-gradient(circle at 80% 80%, #6E2F3C 0, transparent 32%)" }} />
        <div className="relative mx-auto max-w-4xl text-center">
          <Crest className="mx-auto h-16 w-16 text-gold" />
          <p className="mt-6 ornament text-[11px] text-gold">Online School for Advanced Learning</p>
          <h1 className="mt-4 font-display text-5xl leading-[0.95] sm:text-7xl">MAGISTER OPUS</h1>
          <p className="mt-5 text-sm uppercase tracking-[0.28em] text-gold-light">
            Master Work. Master Knowledge. Make an Impact.
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-parchment/85">
            Where learning becomes mastery and achievement becomes a legacy. Where knowledge becomes mastery, and
            mastery becomes meaningful work.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/programs" className="rounded-sm bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-navy-deep">
              Explore Programs
            </Link>
            <Link href="/apply" className="rounded-sm border border-gold-light px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-8">
        <Disclaimer />
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <p className="ornament text-[11px] text-gold-dark">About Magister Opus</p>
        <h2 className="mt-2 font-display text-4xl text-navy">Master Work. Meaningful Learning.</h2>
        <div className="mt-6 space-y-4 text-base leading-8 text-ink/85">
          <p>
            Magister Opus, meaning “Master Work,” is an online school dedicated to advanced learning, professional
            development, intellectual growth, and recognition of meaningful achievement.
          </p>
          <p>
            We believe education is more than earning a credential. It is about developing knowledge, confidence,
            leadership, creativity, and the ability to create meaningful impact.
          </p>
          <p>
            Magister Opus provides flexible online learning opportunities for professionals, educators, entrepreneurs,
            leaders, and lifelong learners who want to continue growing.
          </p>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {["Accessible", "Meaningful", "Flexible", "Relevant", "Learner-centered", "Focused on lifelong growth"].map(
            (item) => (
              <div key={item} className="border border-gold/30 bg-white px-4 py-3 text-sm text-navy">
                {item}
              </div>
            ),
          )}
        </div>
        <Link href="/about" className="mt-6 inline-block text-sm uppercase tracking-[0.16em] text-burgundy">
          Read more about us
        </Link>
      </section>

      <section className="bg-parchment px-4 py-16">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          <div>
            <p className="ornament text-[11px] text-gold-dark">Our Mission</p>
            <p className="mt-4 text-lg leading-8">
              To provide accessible and meaningful learning opportunities that empower individuals to deepen their
              knowledge, develop professional expertise, cultivate leadership, and contribute positively to their
              communities and the world.
            </p>
          </div>
          <div>
            <p className="ornament text-[11px] text-gold-dark">Our Vision</p>
            <p className="mt-4 text-lg leading-8">
              To become a globally connected center for lifelong learning, recognized for developing knowledgeable
              professionals, inspiring leaders, advancing scholarship, and celebrating individuals whose work creates
              meaningful impact.
            </p>
            <p className="mt-4 italic text-navy">A world where learning never stops and meaningful work is recognized.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="ornament text-[11px] text-gold-dark">Our Values</p>
        <h2 className="mt-2 font-display text-4xl text-navy">MAGISTER</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value) => (
            <article key={value.letter} className="border border-gold/25 bg-white p-5 shadow-card">
              <p className="font-display text-4xl text-gold">{value.letter}</p>
              <h3 className="mt-2 text-lg font-semibold text-navy">{value.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/75">{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-navy px-4 py-16 text-parchment">
        <div className="mx-auto max-w-6xl">
          <p className="ornament text-[11px] text-gold">Recognition courses</p>
          <h2 className="mt-2 font-display text-4xl">Eight honorary recognition programs</h2>
          <p className="mt-4 max-w-3xl text-parchment/80">
            These are the live apply targets for Magister Opus. Each course recognizes meaningful achievement in a
            field of leadership, enterprise, or service.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {RECOGNITION_COURSES.map((course) => (
              <article key={course.slug} className="border border-white/10 bg-navy-deep/40 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gold">0{course.sortOrder}</p>
                <h3 className="mt-2 font-display text-2xl">{course.title}</h3>
                <p className="mt-3 text-sm leading-7 text-parchment/75">{course.description}</p>
                <div className="mt-5 flex gap-4 text-xs uppercase tracking-[0.16em]">
                  <Link href={`/programs/${course.slug}`} className="text-gold-light">
                    View course
                  </Link>
                  <Link href={`/apply?course=${course.slug}`} className="text-white">
                    Apply now
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <p className="ornament text-[11px] text-gold-dark">Honorary Doctorate</p>
        <h2 className="mt-2 font-display text-4xl text-navy">Recognizing meaningful achievement</h2>
        <p className="mt-4 max-w-3xl leading-8">
          An honorary doctorate is a distinction presented in recognition of significant achievement, contribution,
          leadership, scholarship, service, innovation, or impact. It is different from an earned doctoral degree and
          is not presented as completion of a conventional doctoral program.
        </p>
        <Link href="/honorary" className="mt-6 inline-block text-sm uppercase tracking-[0.16em] text-burgundy">
          Nominate a candidate
        </Link>
      </section>

      <section className="bg-parchment px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl text-navy">Why choose Magister Opus?</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((item) => (
              <article key={item.n} className="bg-white p-5">
                <p className="text-xs text-gold-dark">{item.n}</p>
                <h3 className="mt-2 font-semibold text-navy">{item.t}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/75">{item.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-4xl text-navy">Who we serve</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AUDIENCE.map((item) => (
            <article key={item.t} className="border-l-2 border-gold pl-4">
              <h3 className="text-lg font-semibold text-navy">{item.t}</h3>
              <p className="mt-1 text-sm leading-6">{item.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-navy-deep px-4 py-16 text-parchment">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-4xl">Your learning journey</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-3">
            {JOURNEY.map((step) => (
              <li key={step.n} className="border border-gold/30 p-5">
                <p className="font-display text-3xl text-gold">{step.n}</p>
                <h3 className="mt-2 text-lg">{step.t}</h3>
                <p className="mt-2 text-sm text-parchment/75">{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="ornament text-[11px] text-gold-dark">Begin your next chapter</p>
        <h2 className="mt-3 font-display text-4xl text-navy">Contact Magister Opus</h2>
        <p className="mt-4 text-lg">Master Work. Master Knowledge. Make an Impact.</p>
        <p className="mt-2 text-sm">
          Email{" "}
          <a className="underline" href="mailto:info@magisteropus.site">
            info@magisteropus.site
          </a>{" "}
          · www.magisteropus.site
        </p>
        <Link href="/apply" className="mt-8 inline-block rounded-sm bg-burgundy px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white">
          Apply Now
        </Link>
      </section>
    </>
  );
}
