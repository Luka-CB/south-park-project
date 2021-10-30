/*
  Warnings:

  - A unique constraint covering the columns `[belongsId]` on the table `ratings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ratings.belongsId_unique" ON "ratings"("belongsId");
