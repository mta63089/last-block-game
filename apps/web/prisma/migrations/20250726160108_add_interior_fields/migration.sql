-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "isInterior" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Tile" ADD COLUMN     "barricadeLevel" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "doorLocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isBuilding" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isInterior" BOOLEAN NOT NULL DEFAULT false;
