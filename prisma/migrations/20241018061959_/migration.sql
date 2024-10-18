/*
  Warnings:

  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tenant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TenantAddress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TenantDiscipline` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TenantType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TenantUrl` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tenant" DROP CONSTRAINT "Tenant_slug_fkey";

-- DropForeignKey
ALTER TABLE "TenantAddress" DROP CONSTRAINT "TenantAddress_cityId_fkey";

-- DropForeignKey
ALTER TABLE "TenantAddress" DROP CONSTRAINT "TenantAddress_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "TenantDiscipline" DROP CONSTRAINT "TenantDiscipline_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "TenantUrl" DROP CONSTRAINT "TenantUrl_title_fkey";

-- DropTable
DROP TABLE "City";

-- DropTable
DROP TABLE "Tenant";

-- DropTable
DROP TABLE "TenantAddress";

-- DropTable
DROP TABLE "TenantDiscipline";

-- DropTable
DROP TABLE "TenantType";

-- DropTable
DROP TABLE "TenantUrl";

-- CreateTable
CREATE TABLE "tenants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "established_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disciplines" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "tenant_id" TEXT,

    CONSTRAINT "disciplines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenant_addresses" (
    "id" TEXT NOT NULL,
    "city_id" TEXT NOT NULL,
    "tenant_id" TEXT,

    CONSTRAINT "tenant_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenant_types" (
    "id" TEXT NOT NULL,
    "role" "TenantRole" NOT NULL DEFAULT 'COMPANY',

    CONSTRAINT "tenant_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenant_medias" (
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "tenant_medias_pkey" PRIMARY KEY ("title","url")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenants_slug_key" ON "tenants"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "disciplines_name_key" ON "disciplines"("name");

-- CreateIndex
CREATE UNIQUE INDEX "disciplines_slug_key" ON "disciplines"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "cities_name_key" ON "cities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "cities_slug_key" ON "cities"("slug");

-- AddForeignKey
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_slug_fkey" FOREIGN KEY ("slug") REFERENCES "tenant_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplines" ADD CONSTRAINT "disciplines_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenant_addresses" ADD CONSTRAINT "tenant_addresses_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenant_addresses" ADD CONSTRAINT "tenant_addresses_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenant_medias" ADD CONSTRAINT "tenant_medias_title_fkey" FOREIGN KEY ("title") REFERENCES "tenants"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
