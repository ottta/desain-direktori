-- DropForeignKey
ALTER TABLE "tenants" DROP CONSTRAINT "tenants_slug_fkey";

-- AddForeignKey
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_id_fkey" FOREIGN KEY ("id") REFERENCES "tenant_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
