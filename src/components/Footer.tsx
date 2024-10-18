import NextLink from "next/link";

import { cn } from "@/libs/utils";

export default function Footer() {
  const d = new Date();
  const year = d.getFullYear();
  return (
    <footer>
      <div
        data-container
        data-grid
        className={cn("h-14", "items-center", "text-xs", "text-neutral-500")}
      >
        <div className={cn("col-span-3")}>
          Copyright &copy;2024{year !== 2024 && `–${year}`} Unforma Club.
        </div>
        <div className={cn("px-2", "col-span-3")}>
          Typeface{" "}
          <a
            href="https://unforma.club/font/nouva"
            target="_blank"
            rel="noopener noreferrer"
            className={cn("underline")}
          >
            Nouva
          </a>{" "}
          by Unforma Club.
        </div>
        <div>
          <NextLink href="/submission">Submission</NextLink>
        </div>
      </div>
    </footer>
  );
}
