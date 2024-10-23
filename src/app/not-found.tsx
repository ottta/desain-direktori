import { cn } from "@/libs/utils";

export default function Page() {
  return (
    <div
      data-container
      className={cn("h-[calc(100svh-4rem)]", "lg:h-[calc(100svh-3.5rem)]")}
    >
      <div className={cn("px-2", "text-7xl", "font-bold")}>Not Found</div>
      <div className={cn("px-2")}>
        The page you are looking for is unavailable.
      </div>
    </div>
  );
}
