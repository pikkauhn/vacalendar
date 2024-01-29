-- CreateTable
CREATE TABLE "User" (
    "employeeId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "dept" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "TimeOffRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "isPaid" BOOLEAN NOT NULL,
    "startDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timeOffType" TEXT NOT NULL,
    "endDate" DATETIME NOT NULL,
    "reason" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    CONSTRAINT "TimeOffRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VacationBalance" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" REAL NOT NULL,
    "balance" REAL NOT NULL,
    CONSTRAINT "VacationBalance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SickBalance" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" REAL NOT NULL,
    "balance" REAL NOT NULL,
    CONSTRAINT "SickBalance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_employeeId_key" ON "User"("employeeId");
