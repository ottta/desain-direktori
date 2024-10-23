import { Metadata } from "next";
import NextImage from "next/image";
import { notFound } from "next/navigation";

import { getTenants } from "@/libs/fetch";
import { cn } from "@/libs/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getTenants(slug);
  if (!data) return {};
  return {
    title: data.name,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const data = await getTenants(slug);
  if (!data) notFound();
  return (
    <>
      <div
        data-container
        className={cn(
          "h-[25svh]",
          "lg:h-[calc(100svh-7rem)]",
          // "@xs:bg-neutral-100",
          "@lg:px-0",
          "overflow-hidden",
        )}
      >
        <div data-grid className={cn("@xs:grid-cols-6")}>
          <div className={cn("col-span-6")}>
            <div
              className={cn(
                "relative",
                "aspect-square",
                "overflow-hidden",
                "w-24",
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
          <div className={cn("col-span-6", "py-2")}>
            <div className={cn("text-3xl", "lg:text-5xl", "font-bold", "px-3")}>
              {data.name}
            </div>
            <div>{data.type}</div>
            <ul>
              {data.discipline.map((item, i) => (
                <li key={i}>{item.name}</li>
              ))}
            </ul>
            <a href={`/profile/${slug}`}>Detail</a>
          </div>
        </div>
      </div>
    </>
  );
}
