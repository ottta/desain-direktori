import { cn } from "@/libs/utils";

export default function Footer() {
  return (
    <footer>
      <div
        data-container
        className={cn("h-14", "flex", "items-center", "text-sm")}
      >
        <div className={cn("px-2")}>
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
