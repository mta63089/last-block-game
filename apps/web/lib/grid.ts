import { Coordinates } from "../types"
import prisma from "./prisma"

/**
 *
 * @param {number} x the x coordinate of the center tile
 * @param {number} y the y coordinate of the center tile
 * @returns {Coordinates[]} an array of the 9 tiles that make up the grid for the given center tile
 */
export function getSurroundingCoordinates(x: number, y: number): Coordinates[] {
  return [
    { x: x - 1, y: y + 1 },
    { x: x, y: y + 1 },
    { x: x + 1, y: y + 1 },
    { x: x - 1, y: y },
    { x: x, y: y },
    { x: x + 1, y: y },
    { x: x - 1, y: y - 1 },
    { x: x, y: y - 1 },
    { x: x + 1, y: y - 1 },
  ]
}

/**
 * Checks if 2 tiles are adjacent to each other
 * @param {number} x the x coordinate of the tile
 * @param {number} y the y coordinate of the tile
 * @param {Coordinates} b the coordinates of the tile to check if adjacent
 * @returns {boolean}
 */
export function isAdjacent(x: number, y: number, b: Coordinates): boolean {
  const dx = Math.abs(x - b.x)
  const dy = Math.abs(y - b.y)
  return (dx === 1 && dy === 0) || (dx === 0 && dy === 1)
}

export function getRandomCoordinates(): Coordinates {
  const x = Math.floor(Math.random() * 10)
  const y = Math.floor(Math.random() * 5)

  return { x: x, y: y }
}

export async function getTileIdFromCoordinates(coords: Coordinates) {
  try {
    const tile = await prisma.tile
      .findFirst({
        where: { coordX: coords.x, coordY: coords.y },
      })
      .then((data) => {
        return data?.id
      })
    return tile
  } catch (err) {
    console.error("failed to find tile at given coordinates", err)
  }
}
