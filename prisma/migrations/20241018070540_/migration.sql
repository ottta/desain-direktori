/*
  Warnings:

  - You are about to drop the `cities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `disciplines` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tenant_addresses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tenant_medias` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tenant_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tenants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DisciplineToTenant" DROP CONSTRAINT "_DisciplineToTenant_A_fkey";

-- DropForeignKey
ALTER TABLE "_DisciplineToTenant" DROP CONSTRAINT "_DisciplineToTenant_B_fkey";

-- DropForeignKey
ALTER TABLE "tenant_addresses" DROP CONSTRAINT "tenant_addresses_city_id_fkey";

-- DropForeignKey
ALTER TABLE "tenant_addresses" DROP CONSTRAINT "tenant_addresses_tenant_id_fkey";

-- DropForeignKey
ALTER TABLE "tenant_medias" DROP CONSTRAINT "tenant_medias_title_fkey";

-- DropForeignKey
ALTER TABLE "tenants" DROP CONSTRAINT "tenants_id_fkey";

-- DropTable
DROP TABLE "cities";

-- DropTable
DROP TABLE "disciplines";

-- DropTable
DROP TABLE "tenant_addresses";

-- DropTable
DROP TABLE "tenant_medias";

-- DropTable
DROP TABLE "tenant_types";

-- DropTable
DROP TABLE "tenants";

-- CreateTable
CREATE TABLE "tenant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "established_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discipline" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "discipline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "city" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "city_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenant_address" (
    "id" TEXT NOT NULL,
    "city_id" TEXT NOT NULL,
    "tenant_id" TEXT,

    CONSTRAINT "tenant_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenant_type" (
    "id" TEXT NOT NULL,
    "role" "TenantRole" NOT NULL DEFAULT 'COMPANY',

    CONSTRAINT "tenant_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenant_media" (
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "tenant_media_pkey" PRIMARY KEY ("title","url")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenant_slug_key" ON "tenant"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "discipline_name_key" ON "discipline"("name");

-- CreateIndex
CREATE UNIQUE INDEX "discipline_slug_key" ON "discipline"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "city_name_key" ON "city"("name");

-- CreateIndex
CREATE UNIQUE INDEX "city_slug_key" ON "city"("slug");

-- AddForeignKey
ALTER TABLE "tenant" ADD CONSTRAINT "tenant_id_fkey" FOREIGN KEY ("id") REFERENCES "tenant_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenant_address" ADD CONSTRAINT "tenant_address_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenant_address" ADD CONSTRAINT "tenant_address_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenant_media" ADD CONSTRAINT "tenant_media_title_fkey" FOREIGN KEY ("title") REFERENCES "tenant"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DisciplineToTenant" ADD CONSTRAINT "_DisciplineToTenant_A_fkey" FOREIGN KEY ("A") REFERENCES "discipline"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DisciplineToTenant" ADD CONSTRAINT "_DisciplineToTenant_B_fkey" FOREIGN KEY ("B") REFERENCES "tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
