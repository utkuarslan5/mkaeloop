/*
  Warnings:

  - You are about to drop the `_SubscribedLoop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Loop` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Loop` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `Loop` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Loop` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "_SubscribedLoop_B_index";

-- DropIndex
DROP INDEX "_SubscribedLoop_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_SubscribedLoop";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Iteration" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "loopId" INTEGER NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    CONSTRAINT "Iteration_loopId_fkey" FOREIGN KEY ("loopId") REFERENCES "Loop" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Checkin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "iterationId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "proofOfWork" TEXT NOT NULL,
    CONSTRAINT "Checkin_iterationId_fkey" FOREIGN KEY ("iterationId") REFERENCES "Iteration" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Checkin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);
INSERT INTO "new_User" ("id") SELECT "id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE TABLE "new_Loop" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "projectType" TEXT NOT NULL,
    "numIterations" INTEGER NOT NULL,
    "frequency" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdById" INTEGER NOT NULL,
    CONSTRAINT "Loop_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Loop" ("frequency", "id", "isActive", "name", "numIterations", "projectType") SELECT "frequency", "id", "isActive", "name", "numIterations", "projectType" FROM "Loop";
DROP TABLE "Loop";
ALTER TABLE "new_Loop" RENAME TO "Loop";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
