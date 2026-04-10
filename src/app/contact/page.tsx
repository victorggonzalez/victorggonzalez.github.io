"use client";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";

const socials = [
  {
    icon: <LinkedInLogoIcon />,
    href: "https://www.linkedin.com/in/victorgonzalezgonzalez/",
    label: "Linkedin",
  },
  {
    icon: <GitHubLogoIcon />,
    href: "https://github.com/victorggonzalez",
    label: "GitHub",
  },
  {
    icon: <EnvelopeClosedIcon />,
    href: "mailto:victor.ggonzalez26@gmail.com",
    label: "Email",
  },
];

export default function Contact() {
  return (
    <div className="site-shell">
      <NavBar />
      <main className="mt-10 space-y-8">
        <section className="frosted-card p-8 md:p-10">
          <p className="section-subtitle">Let&apos;s connect</p>
          <h1 className="section-title mt-2">Open to impactful opportunities</h1>
          <p className="mt-4 max-w-2xl text-zinc-300">
            I&apos;m currently based in Copenhagen and available for software engineering opportunities where product,
            quality, and AI-driven innovation matter.
          </p>
        </section>
        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {socials.map((s, i) => (
            <div key={i}>
              <Link
                href={s.href}
                target="_blank"
                className="frosted-card p-8 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-20 md:p-12"
              >
                <span
                  className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-300/60 via-zinc-400/40 to-transparent"
                  aria-hidden="true"
                />
                <span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-100 group-hover:text-white group-hover:bg-zinc-950 border-zinc-300/40 bg-zinc-900/60 group-hover:border-zinc-100">
                  {s.icon}
                </span>{" "}
                <div className="z-10 flex w-full flex-col items-center">
                  <span className="mt-1 text-base text-center font-medium duration-300 text-zinc-200 group-hover:text-white md:text-lg">
                    {s.label}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
