/*
  Warnings:

  - You are about to drop the column `completed` on the `Iteration` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `Loop` table. All the data in the column will be lost.
  - You are about to drop the column `frequency` on the `Loop` table. All the data in the column will be lost.
  - You are about to drop the column `numIterations` on the `Loop` table. All the data in the column will be lost.
  - You are about to drop the column `projectType` on the `Loop` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Checkin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LoopParticipants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LoopWatchers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `checkin` to the `Iteration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountabilityPartner` to the `Loop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Loop` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Checkin" DROP CONSTRAINT "Checkin_iterationId_fkey";

-- DropForeignKey
ALTER TABLE "Checkin" DROP CONSTRAINT "Checkin_userId_fkey";

-- DropForeignKey
ALTER TABLE "Loop" DROP CONSTRAINT "Loop_createdById_fkey";

-- DropForeignKey
ALTER TABLE "_LoopParticipants" DROP CONSTRAINT "_LoopParticipants_A_fkey";

-- DropForeignKey
ALTER TABLE "_LoopParticipants" DROP CONSTRAINT "_LoopParticipants_B_fkey";

-- DropForeignKey
ALTER TABLE "_LoopWatchers" DROP CONSTRAINT "_LoopWatchers_A_fkey";

-- DropForeignKey
ALTER TABLE "_LoopWatchers" DROP CONSTRAINT "_LoopWatchers_B_fkey";

-- AlterTable
ALTER TABLE "Iteration" DROP COLUMN "completed",
ADD COLUMN     "checkin" TEXT NOT NULL,
ADD COLUMN     "isComplete" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Loop" DROP COLUMN "createdById",
DROP COLUMN "frequency",
DROP COLUMN "numIterations",
DROP COLUMN "projectType",
ADD COLUMN     "accountabilityPartner" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bio",
DROP COLUMN "profileImage";

-- DropTable
DROP TABLE "Checkin";

-- DropTable
DROP TABLE "_LoopParticipants";

-- DropTable
DROP TABLE "_LoopWatchers";

-- AddForeignKey
ALTER TABLE "Loop" ADD CONSTRAINT "Loop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
