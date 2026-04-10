import fs from "fs";
import path from "path";
import matter from "gray-matter";

const careerDirectory = path.join(process.cwd(), "content/career-journey");
const educationDirectory = path.join(process.cwd(), "content/education");
const certificationsDirectory = path.join(process.cwd(), "content/certifications");

type BaseEntry = {
  order?: number;
};

export type CareerEntry = BaseEntry & {
  period: string;
  company: string;
  role: string;
  highlight: string;
};

export type EducationEntry = BaseEntry & {
  school: string;
  degree: string;
};

export type CertificationEntry = BaseEntry & {
  title: string;
  issuer: string;
  date: string;
};

function getMdxSlugs(directory: string) {
  return fs.readdirSync(directory).filter((file) => file.endsWith(".mdx"));
}

function readFrontmatter<T>(directory: string, slug: string): T {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(directory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);
  return data as T;
}

function sortByOrder<T extends BaseEntry>(entries: T[]) {
  return [...entries].sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER));
}

export function getCareerJourney(): CareerEntry[] {
  const entries = getMdxSlugs(careerDirectory).map((slug) => readFrontmatter<CareerEntry>(careerDirectory, slug));
  return sortByOrder(entries);
}

export function getEducation(): EducationEntry[] {
  const entries = getMdxSlugs(educationDirectory).map((slug) => readFrontmatter<EducationEntry>(educationDirectory, slug));
  return sortByOrder(entries);
}

export function getCertifications(): CertificationEntry[] {
  const entries = getMdxSlugs(certificationsDirectory).map((slug) =>
    readFrontmatter<CertificationEntry>(certificationsDirectory, slug),
  );
  return sortByOrder(entries);
}
