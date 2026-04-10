import { MDXRemote } from "next-mdx-remote/rsc"; // for Next.js 13+ app directory
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Github, ExternalLink } from "lucide-react";
import { Project } from "@/lib/projects";

const ProjectItem = ({ slug, meta, content }: Project) => {
  return (
    <article key={slug} className="frosted-card overflow-hidden">
      <div className="grid gap-8 p-6 md:grid-cols-[1.3fr_1fr] md:p-8">
        <Card className="border-white/10 bg-zinc-950/25">
          <CardHeader className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-tight text-white">{meta.title}</h2>
            <p className="text-base text-zinc-300">{meta.description}</p>
          </CardHeader>
          <CardContent>
            <div>
              {meta.technologies && (
                <div className="mb-4">
                  <h3 className="mb-3 text-lg font-semibold text-white">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {meta.technologies?.map((tech: string) => (
                      <Badge key={tech} variant="secondary" className="bg-white/10 text-zinc-100">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              <div className="mb-4">
                <h3 className="mb-3 text-lg font-semibold text-white">Key Features</h3>
                <ul className="list-disc space-y-2 pl-4">
                  {meta.features?.map((feature: string) => (
                    <li key={feature} className="text-zinc-300">
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
                      View code
                    </a>
                  </Button>
                )}
                {meta.liveUrl && meta.liveUrl.length > 0 && (
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
        <div className="mdx-content max-w-none rounded-xl border border-white/10 bg-zinc-950/25 p-6 text-zinc-200">
          <MDXRemote source={content} />
        </div>
      </div>
    </article>
  );
};

export default ProjectItem;
