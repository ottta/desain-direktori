/*
  Warnings:

  - The primary key for the `tenant_address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tenant_media` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[city_id,owner_id]` on the table `tenant_address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,url,owner_id]` on the table `tenant_media` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "tenant_address" DROP CONSTRAINT "tenant_address_pkey";

-- AlterTable
ALTER TABLE "tenant_media" DROP CONSTRAINT "tenant_media_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "tenant_address_city_id_owner_id_key" ON "tenant_address"("city_id", "owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "tenant_media_title_url_owner_id_key" ON "tenant_media"("title", "url", "owner_id");
