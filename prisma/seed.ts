import { toSlug } from "../src/libs/utils";

import { faker } from "@faker-js/faker";
import { PrismaClient, TenantRole } from "@prisma/client";

const prisma = new PrismaClient();

const tenantRole = ["PERSONAL", "COMPANY"];

const cities = [
  "Bandung",
  "Jakarta",
  "Surabaya",
  "Yogyakarta",
  "Medan",
  "Bekasi",
  "Denpasar",
  "Semarang",
  "Padang",
  "Banjarmasin",
  "Makassar",
];

const disciplines = [
  "Type",
  "Branding",
  "Graphic",
  "Motion",
  "Furniture",
  "Interior",
  "Architect",
  "Product",
  "Fashion",
  "Art Director",
  "Spatial",
  "Agency",
  "UI/UX",
];

function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

async function main() {
  const db_city = await prisma.city.createManyAndReturn({
    data: cities.map((item) => ({ name: item, slug: toSlug(item) })),
  });
  const db_discipline = await prisma.discipline.createManyAndReturn({
    data: disciplines.map((item) => ({ name: item, slug: toSlug(item) })),
  });

  await Promise.all(
    Array.from({ length: 1000 }).map(async () => {
      const type = tenantRole[getRandomInt(0, 2)] as keyof typeof TenantRole;
      const name =
        type === "COMPANY" ? faker.company.name() : faker.person.fullName();
      await prisma.tenant.create({
        data: {
          type,
          name,
          slug: toSlug(name),
          avatar_url: faker.image.avatarGitHub(),
          discipline: {
            connect: {
              id: db_discipline[getRandomInt(0, db_discipline.length)].id,
            },
          },
          address: {
            create: {
              city_id: db_city[getRandomInt(0, db_city.length)].id,
            },
          },
          established_at: new Date(
            faker.date.between({
              from: "1980-01-01T00:00:00.000Z",
              to: Date.now(),
            }),
          ),
        },
      });
    }),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
