/*
  Warnings:

  - Added the required column `status` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SaleStatus" AS ENUM ('UNDER_REVIEW', 'AWAITING_PURCHASE', 'AWAITING_PAYMENT', 'COMPLETED');

-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "status" "SaleStatus" NOT NULL;
