/*
  Warnings:

  - You are about to drop the column `codec` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `mimeType` on the `Video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "codec",
DROP COLUMN "mimeType",
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP DEFAULT;
