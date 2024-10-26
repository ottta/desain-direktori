"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { faker } from "@faker-js/faker";
import { Prisma, Tenant } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { z } from "zod";

import { SchemaTenant } from "@/libs/schema";
import { toSlug } from "@/libs/utils";

const schema = z.object({
  name: z
    .string({ invalid_type_error: "Invalid Name" })
    .min(4, "Min. 4 characters")
    .max(20, "Max. 20 characters"),
});

export async function createDiscipline(prev: unknown, formData: FormData) {
  const session = await auth();

  if (!session || !session.user.id) {
    return {
      message: "Unauthorized",
    };
  }

  const validFields = schema.safeParse({
    name: formData.get("name"),
  });
  if (!validFields.success) {
    return {
      errors: validFields.error.flatten().fieldErrors,
    };
  }
  await prisma.discipline.create({
    data: {
      name: validFields.data.name,
      slug: toSlug(validFields.data.name),
      author: { connect: { id: session.user.id } },
    },
  });

  return {
    message: "Success",
  };
}

const schemaCity = z.object({
  name: z.string({ invalid_type_error: "City is required" }),
});

export async function createCity(prev: unknown, formData: FormData) {
  const session = await auth();

  if (!session || !session.user.id) {
    return {
      message: "Unauthorized",
    };
  }

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
        author: { connect: { id: session.user.id } },
      },
    });
    return {
      message: "City has been created!",
    };
  } catch (error) {
    throw error;
  }
}

export async function createTenant(prev: unknown, formData: FormData) {
  const session = await auth();

  if (!session || !session.user.id) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const field = SchemaTenant.safeParse({
    name: formData.get("name"),
    website: formData.get("website"),
    instagram: formData.get("instagram"),
    role: formData.get("role"),
    city: formData.get("city"), // User create its own
    discipline: formData.get("discipline"), // User create its own
    status: formData.get("status"),
  });

  if (field.error) {
    return {
      success: false,
      errors: field.error.flatten().fieldErrors,
    };
  }

  try {
    const author_id = session.user.id;
    await prisma.tenant.create({
      data: {
        type: field.data.role,
        status: session.user.role === "USER" ? "PENDING" : field.data.status,
        avatar_url: faker.image.avatarGitHub(),
        author_id: session.user.id,
        name: field.data.name,
        slug: toSlug(field.data.name),
        media: {
          create: [
            { title: "Website", url: field.data.website },
            {
              title: "Instagram",
              url: field.data.instagram
                ? `https://instagram.com/${field.data.instagram}`
                : null,
            },
          ].filter((item) => item.url),
        },
        discipline: {
          connectOrCreate: {
            where: { name: field.data.discipline },
            create: {
              name: field.data.discipline,
              slug: toSlug(field.data.discipline),
              author_id,
            },
          },
        },
        address: {
          create: {
            city: {
              connectOrCreate: {
                where: { name: field.data.city },
                create: {
                  name: field.data.city,
                  slug: toSlug(field.data.city),
                  author_id,
                },
              },
            },
          },
        },
      },
    });

    revalidateTag("tenants");

    return {
      success: true,
      message: "Tenant created!",
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2002":
          return {
            success: false,
            errors: {
              name: ["Already taken"],
            },
          };

        default:
          return {
            success: false,
          };
      }
    }
    throw error;
  }
}

export async function deleteTenantById(id: string) {
  const req = await prisma.tenant.delete({ where: { id } });
  return req;
}

export async function updateTenantById(id: string, body: Partial<Tenant>) {
  const req = await prisma.tenant.update({ where: { id }, data: body });
  return req;
}
