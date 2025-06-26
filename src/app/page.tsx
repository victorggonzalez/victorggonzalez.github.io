import classes from "./page.module.css";
import { NavBar } from "@/components/NavBar";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
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
    </div>
  );
}
