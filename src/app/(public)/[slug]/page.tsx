import { Metadata } from "next";
import NextImage from "next/image";
import { notFound } from "next/navigation";

import { getTenants } from "@/libs/fetch";
import { cn } from "@/libs/utils";

type PageProps = {
  params: { slug: string };
};
export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const data = await getTenants(slug);
  if (!data) return {};
  return {
    title: data.name,
  };
}

export default async function Page({ params: { slug } }: PageProps) {
  const data = await getTenants(slug);
  if (!data) notFound();
  return (
    <div data-container className={cn("min-h-svh")}>
      <div data-grid>
        <div className={cn("col-span-6")}>
          <ul>
            {data.address.map((item, i) => (
              <li key={i}>{item.city.name}</li>
            ))}
          </ul>
          <div
            className={cn(
              "text-5xl",
              "lg:text-7xl",
              "leading-[0.9]",
              "uppercase",
            )}
          >
            {data.name}
          </div>
          <div>{data.type}</div>
          <ul>
            {data.discipline.map((item, i) => (
              <li key={i}>{item.name}</li>
            ))}
          </ul>
        </div>

        <div
          className={cn(
            "relative",
            "aspect-square",
            "overflow-hidden",
            "col-span-2",
          )}
        >
          <NextImage
            fill
            priority
            alt={data.name}
            src={data.avatar_url}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      <div>
        <div>Since</div>
        <div>{data.established_at.getFullYear()}</div>
      </div>
    </div>
  );
}
