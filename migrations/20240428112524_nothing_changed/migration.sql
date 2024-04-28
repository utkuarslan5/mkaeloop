-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Iteration" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "loopId" INTEGER NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Iteration_loopId_fkey" FOREIGN KEY ("loopId") REFERENCES "Loop" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Iteration" ("endTime", "id", "loopId", "startTime") SELECT "endTime", "id", "loopId", "startTime" FROM "Iteration";
DROP TABLE "Iteration";
ALTER TABLE "new_Iteration" RENAME TO "Iteration";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
