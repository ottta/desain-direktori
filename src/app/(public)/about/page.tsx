import { prisma } from "@/prisma";
import { Metadata } from "next";
import NextImage from "next/image";
import NextLink from "next/link";

import { getGithubContributors } from "@/libs/fetch";
import { cn } from "@/libs/utils";

const about = [
  `<p>Until this time we collect <strong>%DATA_CREATIVES%</strong> creatives within <strong>%DATA_DISCIPLINES%</strong> disciplines accross <strong>%DATA_CITIES%</strong> cities. This project initiate by <a href="https://unforma.club" target="_blank" rel="noopener noreferrer">Taufik Oktama</a> aims to archive <strong>creatives</strong> in Indonesia. Hopefully can help people for looking any creatives or give a chance for creator to be poped up.</p>`,
  `<br/>`,
  `<p>We open for any kind of collaboration and people who looking for improvements of this system. The source code (except data collection) of this application is available as open source on <a href="https://github.com/ottta/desain-direktori" target="_blank" rel="noopener noreferrer">GitHub.</a></p>`,
  `<br/>`,
  `<p>Collected data is safe somewhere on our server. For more information kindly looking at our <a href="/policy/term-of-use">Term of Use</a></p>`,
];

export const metadata: Metadata = {
  title: "About",
};

export default async function About() {
  const [tenants, disciplines, cities, contributors] = await Promise.all([
    prisma.tenant.count(),
    prisma.discipline.count(),
    prisma.city.count(),
    getGithubContributors(),
  ]);

  return (
    <div data-container className={cn("py-28")}>
      <article
        dangerouslySetInnerHTML={{
          __html: about
            .join("")
            .replace("%DATA_CREATIVES%", tenants.toString())
            .replace("%DATA_DISCIPLINES%", disciplines.toString())
            .replace("%DATA_CITIES%", cities.toString()),
        }}
        className={cn(
          "max-w-screen-sm",
          "text-xl",
          "lg:text-2xl",
          "px-3",
          "mb-12",
          "[&_a:hover]:underline",
          "[&_a]:font-bold",
          `[&_a:[target="_blank"]]:text-red-500`,
        )}
      />
      <div className={cn("px-3")}>
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
