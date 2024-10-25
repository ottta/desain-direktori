"use client";

import { Button } from "./ui/button";
import { Switch } from "./ui/switch";

import { LaptopIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { cn } from "@/libs/utils";

export default function ThemeSelector() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isSystem = theme === "system";
  const isDark = resolvedTheme === "dark";

  return (
    <div className={cn("flex", "gap-1", "items-center")}>
      <Switch
        checked={isDark}
        onCheckedChange={() => setTheme(isDark ? "light" : "dark")}
        className={cn("!transition-all")}
      />
      <Button
        variant="secondary"
        onClick={() => setTheme("system")}
        className={cn(
          "w-8",
          "h-8",
          "rounded-full",
          "p-0",
          isSystem && "bg-neutral-100",
          isSystem && "dark:bg-neutral-800",
        )}
      >
        <LaptopIcon className={cn("!w-3")} />
      </Button>
    </div>
  );
}
