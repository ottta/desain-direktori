-- CreateEnum
CREATE TYPE "TenantStatus" AS ENUM ('SUSPEND', 'PUBLISH', 'PENDING', 'DECLINE');

-- AlterTable
ALTER TABLE "tenant" ADD COLUMN     "status" "TenantStatus" NOT NULL DEFAULT 'PENDING';
