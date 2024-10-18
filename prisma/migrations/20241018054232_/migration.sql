/*
  Warnings:

  - You are about to drop the column `cityId` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the column `disciplineId` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the `Discipline` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `City` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Tenant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TenantRole" AS ENUM ('PERSONAL', 'COMPANY');

-- DropForeignKey
ALTER TABLE "Tenant" DROP CONSTRAINT "Tenant_cityId_fkey";

-- DropForeignKey
ALTER TABLE "Tenant" DROP CONSTRAINT "Tenant_disciplineId_fkey";

-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "cityId",
DROP COLUMN "disciplineId",
DROP COLUMN "year",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "establisedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Discipline";

-- CreateTable
CREATE TABLE "TenantDiscipline" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "TenantDiscipline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TenantAddress" (
    "id" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "TenantAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TenantType" (
    "id" TEXT NOT NULL,
    "role" "TenantRole" NOT NULL DEFAULT 'COMPANY',

    CONSTRAINT "TenantType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TenantUrl" (
    "title" TEXT NOT NULL,
    "value" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "TenantUrl_pkey" PRIMARY KEY ("title","value")
);

-- CreateIndex
CREATE UNIQUE INDEX "TenantDiscipline_name_key" ON "TenantDiscipline"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TenantDiscipline_slug_key" ON "TenantDiscipline"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "City_name_key" ON "City"("name");

-- AddForeignKey
ALTER TABLE "Tenant" ADD CONSTRAINT "Tenant_slug_fkey" FOREIGN KEY ("slug") REFERENCES "TenantType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenantDiscipline" ADD CONSTRAINT "TenantDiscipline_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenantAddress" ADD CONSTRAINT "TenantAddress_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenantAddress" ADD CONSTRAINT "TenantAddress_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenantUrl" ADD CONSTRAINT "TenantUrl_title_fkey" FOREIGN KEY ("title") REFERENCES "Tenant"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
