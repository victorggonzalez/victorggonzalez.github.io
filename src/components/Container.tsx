import React, { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode  }) => {
  return (
    <div className="center-items min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      {children}
    </div>
  );
};

export default Container;
