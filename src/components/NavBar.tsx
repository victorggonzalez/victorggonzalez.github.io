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
import "./NavBar.styles.css";
import NavLink from "./NavLink";
import ListItem from "./ListItem";

export function NavBar() {
  return (
    <NavigationMenu orientation="vertical">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <NavLink href="/">About me</NavLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex gap-3 p-4 w-max">
              <ListItem href="/projects/frontend" title="Frontend" />
              <ListItem href="/projects/full-stack" title="Full stack" />
              <ListItem href="/projects/ai" title="AI" />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuLink asChild>
          <NavLink href="/contact">Contact</NavLink>
        </NavigationMenuLink>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
