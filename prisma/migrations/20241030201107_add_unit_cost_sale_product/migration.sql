/*
  Warnings:

  - Added the required column `unitCost` to the `SaleProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SaleProduct" ADD COLUMN     "unitCost" DECIMAL(10,2) NOT NULL;
