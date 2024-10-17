import NextImage from "next/image";
import NextLink from "next/link";

import { getGithubContributors } from "@/libs/fetch";
import { cn } from "@/libs/utils";

export default async function About() {
  const contributors = await getGithubContributors();
  return (
    <div data-container>
      <div>
        <div className={cn("text-4xl", "mb-2")}>GitHub Contributors</div>
        {contributors && (
          <ul className={cn("flex", "gap-1")}>
            {contributors
              .sort((a, b) => b.contributions - a.contributions)
              .map((item, i) => (
                <li key={i}>
                  <NextLink
                    href={item.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.login}
                    title={item.login}
                    className={cn("block", "relative")}
                  >
                    <div
                      className={cn(
                        "relative",
                        "w-10",
                        "aspect-square",
                        "rounded-full",
                        "overflow-hidden",
                      )}
                    >
                      <NextImage alt={item.login} src={item.avatar_url} fill />
                    </div>
                    <div
                      style={{ fontFeatureSettings: `"tnum" 1` }}
                      className={cn(
                        "absolute",
                        "top-0",
                        "right-0",
                        "bg-neutral-900",
                        "text-neutral-100",
                        "h-6",
                        "aspect-square",
                        "rounded-full",
                        "text-xs",
                        "leading-none",
                        "-translate-y-2",
                        "translate-x-2",
                        "text-center",
                        "flex",
                        "items-center",
                        "justify-center",
                      )}
                    >
                      {item.contributions}
                    </div>
                  </NextLink>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
