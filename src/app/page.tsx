import Link from "next/link";
import classes from "./page.module.css";
import { NavBar } from "@/components/NavBar";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <NavBar />
      <main className="flex flex-col gap-[32px] row-start-2 items-center justify-items-center sm:items-start">
        <div className={classes.hero}>
          <h1>Victor Gonzalez</h1>
          <h2>Fullstack Software Engineer</h2>
          <br/>
          <p>Experienced in frontend development</p>
          <br/>
          <p>Passionate about AI</p>
        </div>
      </main>
      <footer className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          <Link
            key={"contact"}
            href={"/contact"}
            className="text-sm duration-500 text-zinc-000 hover:text-zinc-300"
          >
            Contact
          </Link>
        </ul>
      </footer>
    </div>
  );
}
