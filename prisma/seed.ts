import { toSlug } from "../src/libs/utils";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const cities = [
  "Bandung",
  "Jakarta",
  "Surabaya",
  "Yogyakarta",
  "Medan",
  "Bekasi",
  "Denpasar",
];

const disciplines = [
  "Type Foundry",
  "Branding",
  "Graphic Design",
  "Motion Design",
  "Furniture Design",
  "Interior Design",
  "Spatial Design",
  "Agency",
];

async function main() {
  await prisma.city.createMany({
    data: cities.map((item) => ({ name: item, slug: toSlug(item) })),
  });
  await prisma.discipline.createMany({
    data: disciplines.map((item) => ({ name: item, slug: toSlug(item) })),
  });
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
