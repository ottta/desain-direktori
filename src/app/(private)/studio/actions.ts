"use server";

import { prisma } from "@/prisma";
import { z } from "zod";

import { toSlug } from "@/libs/utils";

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
  discipline: z.string(),
  city: z.string(),
  // type: z.string(),
});

export async function createTenant(prev: unknown, formData: FormData) {
  const validFields = schemaTenant.safeParse({
    name: formData.get("name"),
    discipline: formData.get("discipline"),
    city: formData.get("city"),
    // type: formData.get("type"),
  });
  if (!validFields.success) {
    return {
      errors: validFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.tenant.create({
      data: {
        name: validFields.data.name,
        slug: toSlug(validFields.data.name),
        // type: { connect: { id: validFields.data.type } },
        discipline: { connect: { id: validFields.data.discipline } },
        address: { create: { city_id: validFields.data.city } },
      },
      include: { discipline: true, address: true },
    });

    return {
      message: "Mantap",
    };
  } catch (error) {
    throw error;
  }
}

const schemaCity = z.object({
  name: z.string({ invalid_type_error: "City is required" }),
});

export async function createCity(prev: unknown, formData: FormData) {
  const validFields = schemaCity.safeParse({
    name: formData.get("name"),
  });
  if (!validFields.success) {
    return {
      errors: validFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.city.create({
      data: {
        name: validFields.data.name,
        slug: toSlug(validFields.data.name),
      },
    });
    return {
      message: "City has been created!",
    };
  } catch (error) {
    throw error;
  }
}
