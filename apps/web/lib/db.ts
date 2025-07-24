"use server"

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

export async function doesUserHavePlayer(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { player: { select: { id: true } } },
  })

  return Boolean(user?.player)
}

export async function getTilesAroundPlayer(userId: string) {
  const player = await prisma.player.findFirst({
    where: { userId },
    select: { positionX: true, positionY: true },
  })

  if (!player) return []

  const { positionX, positionY } = player

  return await prisma.tile.findMany({
    where: {
      coordX: { gte: positionX - 1, lte: positionX + 1 },
      coordY: { gte: positionY - 1, lte: positionY + 1 },
    },
  })
}

export const getPlayerAndTiles = async (userId: string) => {
  const player = await prisma.player.findFirst({
    where: { userId },
  })

  if (!player) throw new Error("Player not found")

  const tiles = await prisma.tile.findMany({
    where: {
      coordX: { gte: player.positionX - 1, lte: player.positionX + 1 },
      coordY: { gte: player.positionY - 1, lte: player.positionY + 1 },
    },
  })

  return { player, tiles }
}
