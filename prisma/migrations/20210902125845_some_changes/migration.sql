/*
  Warnings:

  - A unique constraint covering the columns `[authorId]` on the table `ratings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ratings.authorId_unique" ON "ratings"("authorId");
