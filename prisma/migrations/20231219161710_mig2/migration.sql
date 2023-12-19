/*
  Warnings:

  - You are about to drop the column `nullableEmail` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `uniqueEmail` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "employeeId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "dept" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("dept", "employeeId", "firstname", "isAdmin", "lastname", "password") SELECT "dept", "employeeId", "firstname", "isAdmin", "lastname", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_employeeId_key" ON "User"("employeeId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
