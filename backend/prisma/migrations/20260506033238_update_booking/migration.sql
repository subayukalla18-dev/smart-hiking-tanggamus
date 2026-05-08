/*
  Warnings:

  - You are about to drop the column `date` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `address` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergencyContact` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hikingDate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nik` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPerson` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "date",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "emergencyContact" TEXT NOT NULL,
ADD COLUMN     "hikingDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "nik" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "totalPerson" INTEGER NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';
