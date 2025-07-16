import { MDXRemote } from "next-mdx-remote/rsc"; // for Next.js 13+ app directory
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Github, ExternalLink } from "lucide-react";
import { Project } from "@/lib/projects";

const ProjectItem = ({ slug, meta, content }: Project) => {
  return (
    <div key={slug}>
      <div>
        <Card>
          <CardHeader>
            <h1 className="text-4xl font-bold">{meta.title}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {meta.description}
            </p>
          </CardHeader>
          <CardContent>
            <div>
              {meta.technologies && (
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {meta.technologies?.map((tech: string) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                <ul className="list-disc list-inside space-y-2">
                  {meta.features?.map((feature: string) => (
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
                {meta.githubUrl && (
                  <Button variant="outline" asChild>
                    <a
                      href={meta.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      View Code
                    </a>
                  </Button>
                )}
                {meta.liveUrl && (
                  <Button asChild>
                    <a
                      href={meta.liveUrl}
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
        <MDXRemote source={content} />
      </div>
    </div>
  );
};

export default ProjectItem;
