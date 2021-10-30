/*
  Warnings:

  - Changed the type of `airDate` on the `episodes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "episodes" DROP COLUMN "airDate",
ADD COLUMN     "airDate" TIMESTAMP(3) NOT NULL;
