-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TimeOffRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "isPaid" BOOLEAN NOT NULL,
    "startDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timeOffType" TEXT NOT NULL,
    "endDate" DATETIME NOT NULL,
    "hours" REAL NOT NULL DEFAULT 0,
    "reason" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    CONSTRAINT "TimeOffRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TimeOffRequest" ("endDate", "id", "isPaid", "notes", "reason", "startDate", "status", "timeOffType", "userId") SELECT "endDate", "id", "isPaid", "notes", "reason", "startDate", "status", "timeOffType", "userId" FROM "TimeOffRequest";
DROP TABLE "TimeOffRequest";
ALTER TABLE "new_TimeOffRequest" RENAME TO "TimeOffRequest";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
