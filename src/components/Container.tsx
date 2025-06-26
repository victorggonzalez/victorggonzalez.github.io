import React, { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode  }) => {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      {children}
    </div>
  );
};

export default Container;
