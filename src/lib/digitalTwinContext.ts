import fs from "fs";
import path from "path";
import matter from "gray-matter";

type MdxEntry = {
  slug: string;
  meta: Record<string, unknown>;
  content: string;
};

const contentRoot = path.join(process.cwd(), "content");
type ContentSection = "career-journey" | "education" | "certifications" | "projects";

let cachedPrompt: string | null = null;

function readMdxDirectory(section: ContentSection): MdxEntry[] {
  const directory = path.join(contentRoot, section);
  if (!fs.existsSync(directory)) return [];

  const files = fs.readdirSync(directory).filter((file) => file.endsWith(".mdx"));
  return files.map((file) => {
    const fullPath = path.join(directory, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      slug: file.replace(/\.mdx$/, ""),
      meta: data as Record<string, unknown>,
      content: content.trim(),
    };
  });
}

function asLine(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function buildProjectsSection(entries: MdxEntry[]) {
  if (!entries.length) return "Projects: None available.";

  const lines = entries.map((entry) => {
    const title = asLine(entry.meta.title) ?? entry.slug;
    const description = asLine(entry.meta.description);
    const technologies = asStringArray(entry.meta.technologies);
    const features = asStringArray(entry.meta.features);
    const detail = [
      description ? `Description: ${description}` : "",
      technologies.length ? `Technologies: ${technologies.join(", ")}` : "",
      features.length ? `Features: ${features.join(", ")}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    return `- ${title}${detail ? ` (${detail})` : ""}`;
  });

  return `Projects:\n${lines.join("\n")}`;
}

function buildCareerSection(entries: MdxEntry[]) {
  if (!entries.length) return "Career journey: None available.";

  const sorted = [...entries].sort((a, b) => Number(a.meta.order ?? 999) - Number(b.meta.order ?? 999));
  const lines = sorted.map((entry) => {
    const company = asLine(entry.meta.company) ?? entry.slug;
    const role = asLine(entry.meta.role);
    const period = asLine(entry.meta.period);
    const highlight = asLine(entry.meta.highlight);
    return `- ${company}${role ? ` - ${role}` : ""}${period ? ` (${period})` : ""}${highlight ? `: ${highlight}` : ""}`;
  });

  return `Career journey:\n${lines.join("\n")}`;
}

function buildEducationSection(entries: MdxEntry[]) {
  if (!entries.length) return "Education: None available.";

  const sorted = [...entries].sort((a, b) => Number(a.meta.order ?? 999) - Number(b.meta.order ?? 999));
  const lines = sorted.map((entry) => {
    const school = asLine(entry.meta.school) ?? entry.slug;
    const degree = asLine(entry.meta.degree);
    return `- ${school}${degree ? ` - ${degree}` : ""}`;
  });

  return `Education:\n${lines.join("\n")}`;
}

function buildCertificationsSection(entries: MdxEntry[]) {
  if (!entries.length) return "Certifications: None available.";

  const sorted = [...entries].sort((a, b) => Number(a.meta.order ?? 999) - Number(b.meta.order ?? 999));
  const lines = sorted.map((entry) => {
    const title = asLine(entry.meta.title) ?? entry.slug;
    const issuer = asLine(entry.meta.issuer);
    const date = asLine(entry.meta.date);
    return `- ${title}${issuer ? ` - ${issuer}` : ""}${date ? ` (${date})` : ""}`;
  });

  return `Certifications:\n${lines.join("\n")}`;
}

export function getDigitalTwinSystemPrompt() {
  if (cachedPrompt) return cachedPrompt;

  const career = readMdxDirectory("career-journey");
  const education = readMdxDirectory("education");
  const certifications = readMdxDirectory("certifications");
  const projects = readMdxDirectory("projects");

  cachedPrompt = `
You are Victor Gonzalez's Digital Twin.
Answer questions about Victor's career, skills, education, certifications, and projects using only the portfolio context below.
If a question asks for unavailable details, say you do not have that detail and suggest contacting Victor directly.
Keep responses concise, professional, and factual.

${buildCareerSection(career)}

${buildEducationSection(education)}

${buildCertificationsSection(certifications)}

${buildProjectsSection(projects)}
`.trim();

  return cachedPrompt;
}
