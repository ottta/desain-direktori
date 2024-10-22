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
      <div className={cn("col-span-6", "py-2")}>
        {/* <ul>
          {data.address.map((item, i) => (
            <li key={i}>{item.city.name}</li>
          ))}
        </ul> */}
        <div
          className={cn(
            "text-5xl",
            "lg:text-5xl",
            // "!leading-[0.9]",
            "font-bold",
            "px-3",
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

      {/* <div>
        <div>Since</div>
        <div>{data.established_at.getFullYear()}</div>
      </div> */}

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  );
}
