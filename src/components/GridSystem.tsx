"use client";

import { useState } from "react";
import { useEventListener } from "usehooks-ts";

import { cn } from "@/libs/utils";

export default function GridSystem() {
  const [grid, setGrid] = useState(false);

  const keyHandler = (e: globalThis.KeyboardEvent) => {
    if (e.metaKey && e.code === "Quote") {
      setGrid((prev) => !prev);
    }
    // Custom shortcut (Opt + Cmd + G)
    if (e.altKey && e.metaKey && e.code === "KeyG") {
      setGrid((prev) => !prev);
    }
  };

  useEventListener("keydown", keyHandler);

  const [mousePos, setMousePos] = useState({ y: 0, x: 0 });
  function mouseHandler(e: globalThis.MouseEvent) {
    const { clientY, clientX } = e;
    setMousePos({ y: clientY, x: clientX });
  }
  useEventListener("mousemove", mouseHandler);

  if (!grid) return;
  return (
    <div className={cn("fixed", "inset-0", "z-50", "pointer-events-none")}>
      <div
        data-container
        className={cn("absolute", "inset-0", "overflow-hidden")}
      >
        <ul data-grid className={cn("relative", "w-full", "h-full", "gap-y-8")}>
          {Array.from({ length: 12 }).map((_, i) => (
            <li
              key={i}
              className={cn(
                "px-3",
                "border-x",
                "border-dotted",
                "not-[:nth-child(-n+4)]:hidden",
                "md:nth-[-n+6]:block",
                "lg:nth-[-n+10]:block",
                "xl:nth-[-n+12]:block",
                // "-ml-px",
              )}
            >
              <div className={cn("h-full", "w-full", "bg-red-100/30")}></div>
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{ top: mousePos.y - 0.5 }}
        className={cn(
          "print:!hidden",
          "fixed",
          "right-0 left-0",
          "border-b",
          "!border-current",
          "z-[9999]",
          "select-none",
          "pointer-events-none",
        )}
      />
      <div
        style={{ left: mousePos.x - 0.5 }}
        className={cn(
          "print:!hidden",
          "fixed",
          "top-0 bottom-0",
          "border-r",
          "!border-current",
          "z-[9999]",
          "select-none",
          "pointer-events-none",
        )}
      />
      <div
        style={{ top: mousePos.y, left: mousePos.x }}
        className={cn(
          "print:!hidden",
          "fixed",
          "w-3 h-3",
          "bg-current",
          "-translate-x-1/2",
          "-translate-y-1/2",
          "z-[9999]",
          "select-none",
          "pointer-events-none",
        )}
      >
        <div
          className={cn(
            "print:!hidden",
            "fixed",
            "top-0",
            "left-0",
            "w-12",
            "translate-x-1/2",
            "translate-y-1/2",
            "whitespace-nowrap",
            "font-mono",
            "font-bold",
            "text-xs",
            "z-[9999]",
          )}
        >
          Y: {mousePos.y}
          <br />
          X: {mousePos.x}
        </div>
      </div>
    </div>
  );
}
