-- DropForeignKey
ALTER TABLE "tenant_address" DROP CONSTRAINT "tenant_address_city_id_fkey";

-- AddForeignKey
ALTER TABLE "tenant_address" ADD CONSTRAINT "tenant_address_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE CASCADE ON UPDATE CASCADE;
