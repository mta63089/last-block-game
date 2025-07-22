// scripts/seed.ts
import prisma from "@/lib/prisma"

async function main() {
  const tiles = await prisma.tile.findMany()
  console.log(tiles)
  console.log("length", tiles.length)
}

main()
