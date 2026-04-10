import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import "./NavBar.styles.css";
import NavLink from "./NavLink";
import ListItem from "./ListItem";

export function NavBar() {
  return (
    <NavigationMenu
      viewport={false}
      className="relative z-50 w-full max-w-full justify-start"
    >
      <NavigationMenuList className="frosted-card w-full min-w-full justify-between px-2 py-2 md:px-3">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <NavLink href="/">About me</NavLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <div className="mx-2 hidden h-6 w-px bg-white/10 md:block" />
        <NavigationMenuItem>
          <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
          <NavigationMenuContent className="left-0 md:left-0">
            <ul className="flex gap-3 p-4 w-max">
              <ListItem href="/projects/frontend" title="Frontend" />
              <ListItem href="/projects/full-stack" title="Full stack" />
              <ListItem href="/projects/ai" title="AI" />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <div className="mx-2 hidden h-6 w-px bg-white/10 md:block" />
        <NavigationMenuLink asChild>
          <NavLink href="/contact">Contact</NavLink>
        </NavigationMenuLink>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
