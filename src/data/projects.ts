export interface Project {
  id: number;
  type: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    type: "full-stack",
    title: "AI Emoji Maker",
    description: "A full-stack web application that allows users to generate custom emojis using AI technology",
    technologies: ["React", "Clerk (authentication)", "Node.js", "Replicate (AI emoji generation)"],
    githubUrl: "https://github.com/victorggonzalez/emoji-maker",
    liveUrl: "https://emoji-maker-sigma.vercel.app/",
    features: [
      "User Authentication",
      "AI Emoji Generation",
      "Emoji Management",
      "Credit System",
      "Real-time Interactions"
    ]
  },
  {
    id: 1,
    type: "frontend",
    title: "Modern Portfolio Website",
    description: "A sleek and responsive portfolio website showcasing creative work with smooth animations and modern design principles.",
    technologies: ["React", "Tailwind CSS", "TypeScript"],
    githubUrl: "https://github.com/victorggonzalez/victorggonzalez.github.io",
    liveUrl: "https://victorggonzalez.github.io",
    features: [
      "Interactive animations",
      "Responsive design",
    ]
  }
]; 
