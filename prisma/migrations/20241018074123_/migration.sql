/*
  Warnings:

  - You are about to drop the `tenant_type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tenant" DROP CONSTRAINT "tenant_id_fkey";

-- AlterTable
ALTER TABLE "tenant" ADD COLUMN     "type" "TenantRole" NOT NULL DEFAULT 'COMPANY';

-- DropTable
DROP TABLE "tenant_type";
