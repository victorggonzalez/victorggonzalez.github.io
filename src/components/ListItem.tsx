"use client";

import * as React from "react";
import { NavigationMenuLink } from "./ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./NavBar.styles.css";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  Omit<React.ComponentPropsWithoutRef<"a">, "href"> & {
    href: string;
    title: string;
  }
>(({ className, title, children, href, ...props }, ref) => {
  const path = usePathname();
  const active = path === href;

  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href}
          className={cn(
            active && "text-accent-foreground font-bold",
            className
          )}
          {...props}
        >
          <div>{title}</div>
          <p>{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default ListItem;
