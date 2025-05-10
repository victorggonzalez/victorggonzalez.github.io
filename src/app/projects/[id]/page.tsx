import { use } from "react";
import Container from "@/components/Container";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export async function generateStaticParams() {
  // You could fetch your list of project IDs here from a CMS, DB, etc.
  const projects = [{ id: "full-stack" }, { id: "ai" }, { id: "design" }];

  return projects.map((project) => ({
    id: project.id,
  }));
}

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <Container>
      <h1>Project: {id}</h1>
      <main>
        <Card>
          <CardHeader>
            <Label htmlFor="name">title</Label>
          </CardHeader>
          <CardContent>
            <Label htmlFor="name">CardHeader</Label>
            {/* <Mdx code={project} /> */}
          </CardContent>
        </Card>
      </main>
    </Container>
  );
}
