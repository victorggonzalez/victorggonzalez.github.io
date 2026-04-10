import { NavBar } from "@/components/NavBar";
import { getCareerJourney, getCertifications, getEducation } from "@/lib/profileSections";
import Link from "next/link";

const focusAreas = [
  "AI Product Engineering",
  "React + TypeScript",
  "Next.js + Node.js",
  "Java + Kafka + AWS",
];

export default function Home() {
  const journey = getCareerJourney();
  const education = getEducation();
  const certifications = getCertifications();

  return (
    <div className="site-shell">
      <NavBar />
      <main className="mt-10 space-y-10">
        <section className="frosted-card p-8 md:p-10">
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Victor Gonzalez
          </h1>
          <p className="mt-2 text-xl text-zinc-200 md:text-2xl">Full Stack Software Engineer</p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-300 md:text-lg">
            I design and ship high-impact products at the intersection of modern frontend engineering, AI systems,
            and scalable backend architecture. With 4+ years of experience, my stack spans React, TypeScript,
            Next.js, Java, Kafka, AWS, and AI/LLM workflows. My focus is clear business value delivered through
            elegant interfaces, strong technical foundations, and pragmatic execution.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {focusAreas.map((item) => (
              <span
                key={item}
                className="rounded-full border border-cyan-200/20 bg-cyan-300/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-cyan-100"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/projects/full-stack"
              className="rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
            >
              Explore projects
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-white/20 px-5 py-2.5 text-sm font-semibold text-zinc-100 transition hover:border-white/40 hover:bg-white/10"
            >
              Contact
            </Link>
          </div>
        </section>

        <section className="frosted-card p-8 md:p-10">
          <p className="section-subtitle">Career journey</p>
          <div className="mt-8 space-y-6">
            {journey.map((item) => (
              <article key={item.company} className="grid gap-3 border-l border-white/15 pl-5 md:grid-cols-[170px_1fr] md:gap-6">
                <p className="text-sm font-medium text-cyan-200">{item.period}</p>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {item.company} <span className="text-zinc-400">- {item.role}</span>
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-300">{item.highlight}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="frosted-card p-8 md:p-10">
          <p className="section-subtitle">Education</p>
          <div className="mt-6 space-y-4">
            {education.map((item) => (
              <article key={`${item.school}-${item.degree}`} className="border-l border-white/15 pl-5">
                <h3 className="text-base font-semibold text-white">{item.school}</h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-300">{item.degree}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="frosted-card p-8 md:p-10">
          <p className="section-subtitle">Certifications</p>
          <ul className="mt-6 space-y-3">
            {certifications.map((item) => (
              <li
                key={`${item.title}-${item.issuer}-${item.date}`}
                className="border-l border-white/15 pl-5 text-sm leading-relaxed text-zinc-300"
              >
                {item.title} ({item.issuer}, {item.date})
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
