/*
  Warnings:

  - You are about to drop the `schedules` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_eventId_fkey";

-- DropTable
DROP TABLE "schedules";

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
