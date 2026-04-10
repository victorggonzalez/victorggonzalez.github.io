import { NavBar } from "@/components/NavBar";
import Link from "next/link";

const journey = [
  {
    period: "Aug 2025 - Present",
    company: "Responsibly",
    role: "Software Engineer",
    highlight:
      "Building semantic ESG intelligence workflows with RAG, NLP scoring systems, and product-grade Next.js delivery.",
  },
  {
    period: "Oct 2022 - Jun 2025",
    company: "Nexthink",
    role: "Software Engineer",
    highlight:
      "Shipped core alerts features, contributed to genAI assistant initiatives, and led cross-team UX consistency efforts.",
  },
  {
    period: "Feb 2022 - Sep 2022",
    company: "Graasp",
    role: "Software Engineer",
    highlight:
      "Built a DevOps orchestration toolkit reducing deployment time by 40% across frontend and backend pipelines.",
  },
  {
    period: "Apr 2021 - Aug 2021",
    company: "NTT DATA",
    role: "Software Engineer Intern",
    highlight:
      "Developed and optimized frontend and backend features using Angular and Java from design through testing.",
  },
  {
    period: "May 2020 - Dec 2020",
    company: "IBM",
    role: "Hybrid Cloud Intern",
    highlight:
      "Contributed to the 5G Maritime proof of concept with Python image processing and ML-enabled geolocation workflows.",
  },
];

const focusAreas = [
  "AI Product Engineering",
  "React + TypeScript",
  "Next.js + Node.js",
  "Java + Kafka + AWS",
];

export default function Home() {
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
      </main>
    </div>
  );
}
