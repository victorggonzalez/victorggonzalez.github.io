import Link from "next/link";
import { NavBar } from "@/components/NavBar";

const categories = [
  {
    id: "full-stack",
    title: "Full stack",
    description: "Production-oriented applications with balanced frontend, backend, and delivery decisions.",
  },
  {
    id: "frontend",
    title: "Frontend",
    description: "UI-heavy products focused on performance, polish, and modern user experiences.",
  },
  {
    id: "ai",
    title: "AI",
    description: "Applied AI products with practical interfaces, LLM workflows, and rapid experimentation.",
  },
];

const Projects = () => {
  return (
    <div className="site-shell">
      <NavBar />
      <main className="mt-10 space-y-8">
        <section className="frosted-card p-8 md:p-10">
          <p className="section-subtitle">Portfolio</p>
          <h1 className="section-title mt-2">Selected projects</h1>
          <p className="mt-4 max-w-2xl text-zinc-300">
            Each project is written as MDX and grouped by focus area. Pick a category to explore detailed builds,
            technology choices, and outcomes.
          </p>
        </section>
        <section className="grid gap-5 md:grid-cols-3">
          {categories.map((category) => (
            <Link
              href={`/projects/${category.id}`}
              key={category.id}
              className="frosted-card p-6 transition hover:-translate-y-0.5 hover:border-cyan-200/30"
            >
              <h2 className="text-xl font-semibold text-white">{category.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{category.description}</p>
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-cyan-200">Open collection</p>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Projects;
