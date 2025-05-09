/*
  Warnings:

  - You are about to drop the `WaterLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WeightHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "WaterLog";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "WeightHistory";
PRAGMA foreign_keys=on;
