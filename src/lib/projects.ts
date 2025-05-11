import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const projectsDirectory = path.join(process.cwd(), 'content/projects');
const categories = ["full-stack", "ai", "frontend"];

export function getProjectSlugs() {
  return fs.readdirSync(projectsDirectory).filter(file => file.endsWith('.mdx'));
}

export function getProjectBySlug(slug: string) {
  const realSlug = slug.replace(/\\.mdx$/, '');
  const fullPath = path.join(projectsDirectory, `${realSlug}`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return {
    slug: realSlug,
    meta: data,
    content,
  };
}

export function getAllProjects() {
  const slugs = getProjectSlugs();
  return slugs.map(slug => getProjectBySlug(slug));
}

export function getAllCategories() {
  return categories;
}

export function getProjectsByCategory(category: string) {
  return getAllProjects().filter(p => p.meta.category === category);
}
