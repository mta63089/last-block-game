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

  const updatedPlayer = await prisma.player.update({
    where: { id: player.id },
    data: { positionX: newX, positionY: newY },
  })

  const tiles = await getTilesAroundPlayer(player.id)

  return { player: updatedPlayer, tiles }
}
