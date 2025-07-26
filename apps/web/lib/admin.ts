"use server"

import prisma from "@/lib/prisma"

export async function createInteriorTile(tileId: string) {
  const tile = await prisma.tile.findUnique({ where: { id: tileId } })
  if (!tile) throw new Error("Tile not found")

  // Check if already has interior
  const existing = await prisma.tile.findFirst({
    where: {
      coordX: tile.coordX,
      coordY: tile.coordY,
      isInterior: true,
    },
  })
  if (existing) throw new Error("Interior already exists")

  await prisma.tile.update({
    where: { id: tileId },
    data: { hasInterior: true, isBuilding: true },
  })

  const newTile = await prisma.tile.create({
    data: {
      ...tile,
      id: undefined,
      name: tile.name + " (Interior)",
      isInterior: true,
    },
  })

  return newTile
}
