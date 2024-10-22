/*
  Warnings:

  - The primary key for the `tenant_address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `tenant_address` table. All the data in the column will be lost.
  - You are about to drop the column `tenant_id` on the `tenant_address` table. All the data in the column will be lost.
  - Added the required column `owner` to the `tenant_address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tenant_address" DROP CONSTRAINT "tenant_address_tenant_id_fkey";

-- AlterTable
ALTER TABLE "tenant_address" DROP CONSTRAINT "tenant_address_pkey",
DROP COLUMN "id",
DROP COLUMN "tenant_id",
ADD COLUMN     "owner" TEXT NOT NULL,
ADD CONSTRAINT "tenant_address_pkey" PRIMARY KEY ("owner");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_id_fkey" FOREIGN KEY ("id") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenant_address" ADD CONSTRAINT "tenant_address_owner_fkey" FOREIGN KEY ("owner") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
