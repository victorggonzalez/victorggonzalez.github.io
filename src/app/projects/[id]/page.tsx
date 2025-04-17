import Container from "@/components/Container";
import { Mdx } from "@/components/mdx";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export async function generateStaticParams() {
  // You could fetch your list of project IDs here from a CMS, DB, etc.
  const projects = [{ id: "full-stack" }, { id: "ai" }, { id: "design" }];

  return projects.map((project) => ({
    id: project.id,
  }));
}

export default function ProjectPage({ params }: { params: { id: string } }) {

  return (
    <Container>
      <h1>Project: {params.id}</h1>
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
