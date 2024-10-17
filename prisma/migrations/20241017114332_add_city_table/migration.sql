/*
  Warnings:

  - You are about to drop the column `city` on the `Tenant` table. All the data in the column will be lost.
  - Added the required column `cityId` to the `Tenant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "city",
ADD COLUMN     "cityId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "City_slug_key" ON "City"("slug");

-- AddForeignKey
ALTER TABLE "Tenant" ADD CONSTRAINT "Tenant_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
