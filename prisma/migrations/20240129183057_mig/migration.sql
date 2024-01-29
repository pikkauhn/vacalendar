/*
  Warnings:

  - You are about to drop the column `sickBalance` on the `SickBalance` table. All the data in the column will be lost.
  - You are about to drop the column `vacationBalance` on the `VacationBalance` table. All the data in the column will be lost.
  - Added the required column `sickBal` to the `SickBalance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vacationBal` to the `VacationBalance` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SickBalance" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sickYear" REAL NOT NULL,
    "sickBal" REAL NOT NULL,
    CONSTRAINT "SickBalance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SickBalance" ("sickYear", "userId") SELECT "sickYear", "userId" FROM "SickBalance";
DROP TABLE "SickBalance";
ALTER TABLE "new_SickBalance" RENAME TO "SickBalance";
CREATE TABLE "new_VacationBalance" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vacationYear" REAL NOT NULL,
    "vacationBal" REAL NOT NULL,
    CONSTRAINT "VacationBalance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_VacationBalance" ("userId", "vacationYear") SELECT "userId", "vacationYear" FROM "VacationBalance";
DROP TABLE "VacationBalance";
ALTER TABLE "new_VacationBalance" RENAME TO "VacationBalance";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
