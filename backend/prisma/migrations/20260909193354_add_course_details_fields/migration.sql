/*
  Warnings:

  - Added the required column `duration` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `format` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "ageRange" TEXT,
ADD COLUMN     "benefits" TEXT[],
ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "format" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "mentor" TEXT,
ADD COLUMN     "projectsCount" INTEGER,
ADD COLUMN     "toolsCovered" TEXT[];
