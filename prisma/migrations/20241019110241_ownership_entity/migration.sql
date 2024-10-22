/*
  Warnings:

  - You are about to drop the `_TenantToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `city` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `discipline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `tenant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_TenantToUser" DROP CONSTRAINT "_TenantToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TenantToUser" DROP CONSTRAINT "_TenantToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "tenant_address" DROP CONSTRAINT "tenant_address_owner_fkey";

-- AlterTable
ALTER TABLE "city" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "discipline" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tenant" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_TenantToUser";

-- AddForeignKey
ALTER TABLE "discipline" ADD CONSTRAINT "discipline_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenant" ADD CONSTRAINT "tenant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenant_address" ADD CONSTRAINT "tenant_address_owner_fkey" FOREIGN KEY ("owner") REFERENCES "tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
