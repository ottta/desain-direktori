/*
  Warnings:

  - You are about to drop the column `userId` on the `city` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `discipline` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `tenant` table. All the data in the column will be lost.
  - The primary key for the `tenant_address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `owner` on the `tenant_address` table. All the data in the column will be lost.
  - The primary key for the `tenant_media` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `owner` on the `tenant_media` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `city` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_id` to the `discipline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_id` to the `tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `tenant_address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `tenant_media` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "city" DROP CONSTRAINT "city_userId_fkey";

-- DropForeignKey
ALTER TABLE "discipline" DROP CONSTRAINT "discipline_userId_fkey";

-- DropForeignKey
ALTER TABLE "tenant" DROP CONSTRAINT "tenant_userId_fkey";

-- DropForeignKey
ALTER TABLE "tenant_address" DROP CONSTRAINT "tenant_address_owner_fkey";

-- DropForeignKey
ALTER TABLE "tenant_media" DROP CONSTRAINT "tenant_media_owner_fkey";

-- AlterTable
ALTER TABLE "city" DROP COLUMN "userId",
ADD COLUMN     "author_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "discipline" DROP COLUMN "userId",
ADD COLUMN     "author_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tenant" DROP COLUMN "userId",
ADD COLUMN     "author_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tenant_address" DROP CONSTRAINT "tenant_address_pkey",
DROP COLUMN "owner",
ADD COLUMN     "owner_id" TEXT NOT NULL,
ADD CONSTRAINT "tenant_address_pkey" PRIMARY KEY ("owner_id");

-- AlterTable
ALTER TABLE "tenant_media" DROP CONSTRAINT "tenant_media_pkey",
DROP COLUMN "owner",
ADD COLUMN     "owner_id" TEXT NOT NULL,
ADD CONSTRAINT "tenant_media_pkey" PRIMARY KEY ("owner_id");

-- AddForeignKey
ALTER TABLE "discipline" ADD CONSTRAINT "discipline_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenant" ADD CONSTRAINT "tenant_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenant_address" ADD CONSTRAINT "tenant_address_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenant_media" ADD CONSTRAINT "tenant_media_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
