"use client";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

const socials = [
  {
    icon: <LinkedInLogoIcon />,
    href: "https://www.linkedin.com/in/victorgonzalezgonzalez/",
    label: "Linkedin",
    handle: "in/victorgonzalezgonzalez",
  },
  {
    icon: <GitHubLogoIcon />,
    href: "https://github.com/victorggonzalez",
    label: "GitHub",
    handle: "github.com/victorggonzalez",
  },
];

export default function Contact() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <NavBar />
      <main>
        <div className="grid w-full grid-cols-1 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-2 lg:gap-16">
          {socials.map((s, i) => (
            <div key={i}>
              <Link
                href={s.href}
                target="_blank"
                className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24  lg:pb-48  md:p-16"
              >
                <span
                  className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
                  aria-hidden="true"
                />
                <span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
                  {s.icon}
                </span>{" "}
                <div className="z-10 flex flex-col items-center">
                  <span className="lg:text-xl font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-white font-display">
                    {s.handle}
                  </span>
                  <span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
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
