import { getAllCategories, getProjectsByCategory } from "@/lib/projects";
import { MDXRemote } from "next-mdx-remote/rsc"; // for Next.js 13+ app directory
import { use } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Github, ExternalLink } from "lucide-react";

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
        <h1 className="text-4xl font-bold">No projects found</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div key={project.slug}>
            <div>
              <Card>
                <CardHeader>
                  <h1 className="text-4xl font-bold">{project.meta.title}</h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    {project.meta.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div>
                    {project.meta.technologies && (
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-3">
                          Technologies
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.meta.technologies?.map((tech: string) => (
                            <Badge key={tech} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-3">
                        Key Features
                      </h3>
                      <ul className="list-disc list-inside space-y-2">
                        {project.meta.features?.map((feature: string) => (
                          <li
                            key={feature}
                            className="text-gray-600 dark:text-gray-300"
                          >
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex gap-4">
                      {project.meta.githubUrl && (
                        <Button variant="outline" asChild>
                          <a
                            href={project.meta.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="mr-2 h-4 w-4" />
                            View Code
                          </a>
                        </Button>
                      )}
                      {project.meta.liveUrl && (
                        <Button asChild>
                          <a
                            href={project.meta.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
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
            <div>
              <MDXRemote source={project.content} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
