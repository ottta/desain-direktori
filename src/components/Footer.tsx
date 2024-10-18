import { cn } from "@/libs/utils";

export default function Footer() {
  return (
    <footer>
      <div
        data-container
        data-grid
        className={cn("h-14", "items-center", "text-sm")}
      >
        <div className={cn("col-span-3")}>&copy;2024 Desain Direktori.</div>
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
      </div>
    </footer>
  );
}
