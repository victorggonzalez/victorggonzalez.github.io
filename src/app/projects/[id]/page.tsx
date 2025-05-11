import { use } from "react";
import Container from "@/components/Container";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { projects } from "@/data/projects";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  const projects = [{ id: "full-stack" }, { id: "ai" }, { id: "frontend" }];
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const projectList = projects.filter((p) => p.type == id)

  if (!projectList.length) {
    return (
      <Container>
      <main>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"></div>
        <h1 className="text-4xl font-bold">No projects found</h1>
        </main>
      </Container>
    );
  }

  return (
    <Container>
      <main>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectList.map((project) => (
            <div key={project.id}>
              <Card>
                <CardHeader>
                  <h1 className="text-4xl font-bold">{project.title}</h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300">{project.description}</p>
                </CardHeader>
                <CardContent>
                  <div>
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-3">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                      <ul className="list-disc list-inside space-y-2">
                        {project.features.map((feature) => (
                          <li key={feature} className="text-gray-600 dark:text-gray-300">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex gap-4">
                      {project.githubUrl && (
                        <Button variant="outline" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            View Code
                          </a>
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </main>
      <footer className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          <Link
            key={"home"}
            href={"/"}
            className="text-sm duration-500 text-zinc-000 hover:text-zinc-300"
          >
            Home
          </Link>
        </ul>
      </footer>
    </Container>
  );
}
