# Personal Portfolio – Next.js + MDX
This is a personal portfolio web application built with Next.js and MDX.
Projects are managed as individual MDX files, making it easy to add, edit, and maintain project content with rich formatting and metadata.

## Project Overview
The site dynamically generates project category pages (e.g., /projects/ai, /projects/full-stack) and displays all projects in that category.

## Tech Stack
- Framework: Next.js 13+ (App Router)
- Styling: Tailwind CSS
- Markdown/MDX: MDX, gray-matter
- Icons: Lucide React
- UI Components: Custom, with shadcn/ui patterns

## Key Features
1. **MDX-based Projects**: Each project is a Markdown/MDX file with frontmatter for metadata (title, description, category, etc.).
2. **Category Pages**: Dynamic routes for each project category (e.g., /projects/ai), listing all projects in that category.
3. **Rich Content**: Projects can include code blocks, images, and custom React components via MDX.
4. **Responsive Design**: Clean, modern, and mobile-friendly UI.
5. **Easy Content Management**: Add or edit projects by simply updating files in content/projects/.

## Setup and Deployment
1. **Install Dependencies**
    `npm run install`

2. **Add Your Projects** 
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

3. **Run the Development Server**
    `npm run dev`
    Visit http://localhost:3000 to view your site.


## Important Notes
- Static Export: The app uses output: 'export' in next.config.js for static site generation.
- Image optimization is disabled (images.unoptimized: true).
- MDX Content: All project content and metadata are managed via MDX files in content/projects/.
- Category Routing: The [id] route under /projects/ matches the category field in your MDX frontmatter.
- Adding Projects: To add a new project, simply create a new .mdx file in content/projects/ with the appropriate frontmatter.
- Extensibility: You can add custom MDX components or extend the metadata as needed.
