/*
  Warnings:

  - You are about to drop the column `tenant_id` on the `disciplines` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "disciplines" DROP CONSTRAINT "disciplines_tenant_id_fkey";

-- AlterTable
ALTER TABLE "disciplines" DROP COLUMN "tenant_id";

-- CreateTable
CREATE TABLE "_DisciplineToTenant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DisciplineToTenant_AB_unique" ON "_DisciplineToTenant"("A", "B");

-- CreateIndex
CREATE INDEX "_DisciplineToTenant_B_index" ON "_DisciplineToTenant"("B");

-- AddForeignKey
ALTER TABLE "_DisciplineToTenant" ADD CONSTRAINT "_DisciplineToTenant_A_fkey" FOREIGN KEY ("A") REFERENCES "disciplines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DisciplineToTenant" ADD CONSTRAINT "_DisciplineToTenant_B_fkey" FOREIGN KEY ("B") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
