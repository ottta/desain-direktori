/*
  Warnings:

  - A unique constraint covering the columns `[cursor]` on the table `tenant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "tenant" ADD COLUMN     "cursor" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tenant_cursor_key" ON "tenant"("cursor");
