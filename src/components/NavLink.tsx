"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

const NavLink = ({ href, children }: NavLinkProps) => {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={cn("nav-link", path === href && "nav-link-active")}
    >
      {children}
    </Link>
  );
};
export default NavLink;
