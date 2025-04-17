import React from "react";

const Container = ({ children }: { children: any }) => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      {children}
    </div>
  );
};

export default Container;
