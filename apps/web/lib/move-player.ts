"use server"

import { getTilesAroundPlayer } from "@/lib/db"
import prisma from "@/lib/prisma"

export async function movePlayer(
  userId: string,
  direction: "up" | "down" | "left" | "right"
) {
  const player = await prisma.player.findUnique({ where: { userId } })
  if (!player) return { error: "Player not found" }

  let newX = player.positionX
  let newY = player.positionY

  if (direction === "up") newY -= 1
  if (direction === "down") newY += 1
  if (direction === "left") newX -= 1
  if (direction === "right") newX += 1

  const newTile = await prisma.tile.findFirst({
    where: { coordX: newX, coordY: newY },
  })

  const updatedPlayer = await prisma.player.update({
    where: { id: player.id },
    data: {
      positionX: newX,
      positionY: newY,
      tile: { connect: { id: newTile?.id } },
    },
  })

  const tiles = await getTilesAroundPlayer(userId)

  return { player: updatedPlayer, tiles }
}

export async function resetPlayerPosition(userId: string) {
  const player = await prisma.player.findUnique({ where: { userId: userId } })
  if (!player) return { error: "Player not found" }

  const p = await prisma.player.update({
    where: { id: userId },
    data: { positionX: 3, positionY: 3 },
  })
}

export async function toggleInterior(userId: string) {
  const player = await prisma.player.findUnique({
    where: { userId },
    include: { tile: true },
  })

  if (!player) throw new Error("Player not found")
  if (player.energy < 1) throw new Error("Not enough energy")

  const currentTile = player.tile

  if (!currentTile) throw new Error("Cant find currentTile")

  const targetTile = await prisma.tile.findFirst({
    where: {
      coordX: currentTile.coordX,
      coordY: currentTile.coordY,
      isInterior: !currentTile.isInterior,
    },
  })

  if (!targetTile) throw new Error("Target tile not found")

  if (targetTile.doorLocked) {
    // placeholder logic: player must have key or skill
    const hasKey = false
    if (!hasKey) throw new Error("The door is locked")
  }

  const updatedPlayer = await prisma.player.update({
    where: { id: player.id },
    data: {
      energy: { decrement: 1 },
      tileId: targetTile.id,
      positionX: targetTile.coordX,
      positionY: targetTile.coordY,
      isInterior: !player.isInterior,
    },
  })

  const tiles = await getTilesAroundPlayer(userId)
  return { player: updatedPlayer, tiles }
}
