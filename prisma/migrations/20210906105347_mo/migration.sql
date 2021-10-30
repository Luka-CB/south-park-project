/*
  Warnings:

  - The `avgRating` column on the `episodes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "episodes" ADD COLUMN     "positionNum" INTEGER,
DROP COLUMN "avgRating",
ADD COLUMN     "avgRating" DOUBLE PRECISION;
