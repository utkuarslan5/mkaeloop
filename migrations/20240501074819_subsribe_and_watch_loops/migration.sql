-- CreateTable
CREATE TABLE "_LoopWatchers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_LoopWatchers_A_fkey" FOREIGN KEY ("A") REFERENCES "Loop" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_LoopWatchers_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_LoopParticipants" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_LoopParticipants_A_fkey" FOREIGN KEY ("A") REFERENCES "Loop" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_LoopParticipants_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_LoopWatchers_AB_unique" ON "_LoopWatchers"("A", "B");

-- CreateIndex
CREATE INDEX "_LoopWatchers_B_index" ON "_LoopWatchers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LoopParticipants_AB_unique" ON "_LoopParticipants"("A", "B");

-- CreateIndex
CREATE INDEX "_LoopParticipants_B_index" ON "_LoopParticipants"("B");
