import { PlayerClass } from "@/generated/prisma"

import { getRandomCoordinates, getTileIdFromCoordinates } from "./grid"
import prisma from "./prisma"

export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id: id },
    include: { player: true },
  })
}

export const createPlayer = async (
  name: string,
  userId: string,
  profession: PlayerClass,
  avatarUrl: string
) => {
  const startingCoordinates = getRandomCoordinates()
  const tileId = await getTileIdFromCoordinates(startingCoordinates)
  if (!tileId) return
  const data = {
    name,
    avatarUrl,
    class: profession,
    energy: 25,
    health: 50,
    positionX: startingCoordinates.x,
    positionY: startingCoordinates.y,
    userId,
    tileId,
  }
  const player = await prisma.player.create({ data })
  return player
}
