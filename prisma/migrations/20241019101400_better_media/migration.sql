/*
  Warnings:

  - The primary key for the `tenant_media` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `owner` to the `tenant_media` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tenant_media" DROP CONSTRAINT "tenant_media_title_fkey";

-- AlterTable
ALTER TABLE "tenant_media" DROP CONSTRAINT "tenant_media_pkey",
ADD COLUMN     "owner" TEXT NOT NULL,
ALTER COLUMN "title" SET DEFAULT '',
ADD CONSTRAINT "tenant_media_pkey" PRIMARY KEY ("owner");

-- AddForeignKey
ALTER TABLE "tenant_media" ADD CONSTRAINT "tenant_media_owner_fkey" FOREIGN KEY ("owner") REFERENCES "tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
