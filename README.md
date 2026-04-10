# Personal Portfolio – Next.js + MDX
This is a personal portfolio web application built with Next.js and MDX.
Projects are managed as individual MDX files, making it easy to add, edit, and maintain project content with rich formatting and metadata.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Architecture Summary](#architecture-summary)
- [Key Features](#key-features)
- [Content Source of Truth](#content-source-of-truth)
- [Digital Twin](#digital-twin)
- [Environment Variables](#environment-variables)
- [Local Development](#local-development)
- [Deployment](#deployment)
- [Important Notes](#important-notes)

## Project Overview
The site dynamically generates project category pages (e.g., /projects/ai, /projects/full-stack) and displays all projects in that category.

## Tech Stack
- Framework: Next.js 13+ (App Router)
- Styling: Tailwind CSS
- Markdown/MDX: MDX, gray-matter
- Icons: Lucide React
- UI Components: Custom, with shadcn/ui patterns

## Architecture Summary

- **Frontend:** Next.js app with premium, dark, frosted UI and responsive layouts.
- **Content model:** MDX files as source-of-truth for projects, career journey, education, and certifications.
- **AI Digital Twin UI:** global floating chatbot widget mounted at root layout level.
- **Deployment model:** split setup:
  - static frontend on GitHub Pages
  - serverless API on Vercel (`/api/digital-twin`)

## Key Features
1. **MDX-based Projects**: Each project is a Markdown/MDX file with frontmatter for metadata (title, description, category, etc.).
2. **Category Pages**: Dynamic routes for each project category (e.g., /projects/ai), listing all projects in that category.
3. **Rich Content**: Projects can include code blocks, images, and custom React components via MDX.
4. **Responsive Design**: Clean, modern, and mobile-friendly UI.
5. **Easy Content Management**: Add or edit projects by simply updating files in content/projects/.

### Content Source of Truth

The Digital Twin and portfolio pages are aligned through MDX content directories:

- `content/projects`
- `content/career-journey`
- `content/education`
- `content/certifications`

**Add Your Projects** 

Place your project MDX files in `content/projects/` folder.
Each file should have frontmatter like:
```
---
title: "My Project"
description: "A cool project."
category: "ai"
technologies: ["Next.js", "TypeScript"]
githubUrl: "https://github.com/yourusername/my-project"
liveUrl: "https://myproject.com"
features: ["Random feature #1"]
---
Project details here...
```

### Digital Twin

- **Widget component:** `src/components/DigitalTwinWidget.tsx`
- **UX:** bottom-right launcher, overlay chat panel, starter prompts, markdown-rendered agent replies
- **Session behavior:** chat state is in-memory only (refresh/new tab starts clean)
- **Safety controls:** request limits and sanitized server errors

## Environment Variables

### Frontend (GitHub Pages build time)

- `NEXT_PUBLIC_DIGITAL_TWIN_API_URL`
  - Example: `https://your-vercel-api.vercel.app`

### Serverless API (Vercel runtime)

- `OPENROUTER_API_KEY`
  - Used server-side only
  - Never expose as `NEXT_PUBLIC_*`

## Local Development

1. Install dependencies:
   - `npm install`
2. Run app:
   - `npm run dev`
3. Optional local API key in `.env`:
   - `OPENROUTER_API_KEY=...`

## Deployment

### GitHub Pages

Workflow: `.github/workflows/nextjs.yml`

- Injects `NEXT_PUBLIC_DIGITAL_TWIN_API_URL` from `github-pages` environment variables.
- Includes a build-time validation step that fails if missing.

### Vercel API

- API entrypoint: `api/digital-twin.js` (CommonJS, CORS-enabled, OPTIONS supported)
- Config: `vercel.json` (minimal schema)

## Important Notes
- Static Export: The app uses output: 'export' in next.config.js for static site generation.
- Image optimization is disabled (images.unoptimized: true).
- MDX Content: All project content and metadata are managed via MDX files in content/projects/.
- Category Routing: The [id] route under /projects/ matches the category field in your MDX frontmatter.
- Adding Projects: To add a new project, simply create a new .mdx file in content/projects/ with the appropriate frontmatter.
- Extensibility: You can add custom MDX components or extend the metadata as needed.
