"use client";
import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import "./NavBar.styles.css";

export function NavBar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <NavigationMenu orientation="vertical">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/"
              className={cn("nav-link", isActive("/") && "nav-link-active")}
            >
              About me
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(
              "nav-link",
              (pathname.startsWith("/projects")) && "nav-link-active"
            )}
          >
            Projects
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex gap-3 p-4 w-max">
              <ListItem
                href="/projects/frontend"
                title="Frontend"
                active={isActive("/projects/frontend")}
              />
              <ListItem
                href="/projects/full-stack"
                title="Full stack"
                active={isActive("/projects/full-stack")}
              />
              <ListItem
                href="/projects/ai"
                title="AI"
                active={isActive("/projects/ai")}
              />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            href="/contact"
            className={cn(
              "nav-link",
              isActive("/contact") && "nav-link-active"
            )}
          >
            Contact
          </Link>
        </NavigationMenuLink>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  Omit<React.ComponentPropsWithoutRef<"a">, "href"> & { href: string; title: string; active?: boolean }
>(({ className, title, children, active, href, ...props }, ref) => {
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
