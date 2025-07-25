// scripts/seed.ts
import { seedTiles } from "@/data/tiles"

import prisma from "@/lib/prisma"

async function main() {
  await prisma.tile.createMany({
    data: seedTiles,
    skipDuplicates: true,
  })
  console.log("🌱 Seeding complete")
}

main()
