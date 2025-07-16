import { getAllCategories, getProjectsByCategory } from "@/lib/projects";
import { use } from "react";
import ProjectItem from "@/components/projects/ProjectItem";

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
      <main>
        <h1 className="text-4xl font-bold">More projects coming soon</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectItem key={index} {...project} />
        ))}
      </div>
    </main>
  );
}
