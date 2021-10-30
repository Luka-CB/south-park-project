/*
  Warnings:

  - A unique constraint covering the columns `[season]` on the table `seasons` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "seasons.season_unique" ON "seasons"("season");
