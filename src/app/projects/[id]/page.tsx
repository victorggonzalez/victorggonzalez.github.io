import { getAllCategories, getProjectsByCategory } from "@/lib/projects";
import { use } from "react";
import ProjectItem from "@/components/projects/ProjectItem";

function formatCategoryTitle(category: string) {
  return category
    .split("-")
    .map((word) => (word.toLowerCase() === "ai" ? "AI" : word.charAt(0).toUpperCase() + word.slice(1)))
    .join(" ");
}

export async function generateStaticParams() {
  return getAllCategories().map((category) => ({ id: category }));
}

export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const projects = getProjectsByCategory(id);

  if (!projects.length) {
    return (
      <main className="mt-10">
        <h1 className="text-4xl font-bold text-white">More projects coming soon</h1>
      </main>
    );
  }

  return (
    <main className="mt-10">
      <div className="mb-8">
        <p className="section-subtitle">Project collection</p>
        <h1 className="section-title mt-2">{formatCategoryTitle(id)}</h1>
      </div>
      <div className="grid grid-cols-1 gap-8">
        {projects.map((project, index) => (
          <ProjectItem key={index} {...project} />
        ))}
      </div>
    </main>
  );
}
