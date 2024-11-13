/*
  Warnings:

  - You are about to drop the column `drivers` on the `CoreIdentity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CoreIdentity" DROP COLUMN "drivers",
ADD COLUMN     "vision" TEXT;
