/*
  Warnings:

  - You are about to drop the column `slug` on the `Actor` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Producer` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Tag` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Actor_slug_idx";

-- DropIndex
DROP INDEX "Actor_slug_key";

-- DropIndex
DROP INDEX "Producer_slug_idx";

-- DropIndex
DROP INDEX "Producer_slug_key";

-- DropIndex
DROP INDEX "Tag_slug_idx";

-- DropIndex
DROP INDEX "Tag_slug_key";

-- AlterTable
ALTER TABLE "Actor" DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "Producer" DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "slug";

-- CreateIndex
CREATE INDEX "Actor_name_idx" ON "Actor"("name");

-- CreateIndex
CREATE INDEX "Producer_name_idx" ON "Producer"("name");

-- CreateIndex
CREATE INDEX "Tag_name_idx" ON "Tag"("name");
