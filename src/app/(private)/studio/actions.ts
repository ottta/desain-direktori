"use server";

import { prisma } from "@/prisma";
import { revalidateTag } from "next/cache";
import { z } from "zod";

import { fetcher } from "@/libs/fetch";
import { toSlug } from "@/libs/utils";

const origin = process.env.NEXT_PUBLIC_HOST;

const schema = z.object({
  name: z
    .string({ invalid_type_error: "Invalid Name" })
    .min(4, "Min. 4 characters")
    .max(20, "Max. 20 characters"),
});

export async function createDiscipline(prev: unknown, formData: FormData) {
  const validFields = schema.safeParse({
    name: formData.get("name"),
  });
  if (!validFields.success) {
    return {
      errors: validFields.error.flatten().fieldErrors,
    };
  }
  await prisma.discipline.create({
    data: { name: validFields.data.name, slug: toSlug(validFields.data.name) },
  });

  return {
    message: "Success",
  };
}

const schemaTenant = z.object({
  name: z.string().min(4, "Min. 4 characters").max(20, "Max. 20 characters"),
  year: z.string().length(4, "Must be valid year"),
  discipline: z.string(),
  city: z.string(),
});

export async function createTenant(prev: unknown, formData: FormData) {
  const validFields = schemaTenant.safeParse({
    name: formData.get("name"),
    year: formData.get("year"),
    discipline: formData.get("discipline"),
    city: formData.get("city"),
  });
  if (!validFields.success) {
    return {
      errors: validFields.error.flatten().fieldErrors,
    };
  }

  const data = await fetcher<{
    data: unknown;
    success: boolean;
    message: string;
  }>(`${origin}/api/tenants`, {
    method: "POST",
    body: JSON.stringify({
      name: validFields.data.name,
      slug: toSlug(validFields.data.name),
      disciplineId: validFields.data.discipline,
      year: parseInt(validFields.data.year),
      cityId: validFields.data.city,
    }),
  });

  if (!data.success) {
    return {
      message: data.message,
    };
  }

  revalidateTag("tenants");
  console.log(data);
}
