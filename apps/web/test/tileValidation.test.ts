// apps/web/tests/tileValidation.test.ts
import { describe, expect, it } from "vitest"

import prisma from "@/lib/prisma" // <- updated to match your actual path

describe("Tile DB Integrity", () => {
  it("has no gaps in coordinates starting from (0,0)", async () => {
    const tiles = await prisma.tile.findMany()
    const coords = new Set(tiles.map((t) => `${t.coordX},${t.coordY}`))
    const maxX = Math.max(...tiles.map((t) => t.coordX))
    const maxY = Math.max(...tiles.map((t) => t.coordY))

    for (let x = 0; x <= maxX; x++) {
      for (let y = 0; y <= maxY; y++) {
        expect(coords.has(`${x},${y}`)).toBe(true)
      }
    }
  })

  it("has no duplicate coordinates", async () => {
    const tiles = await prisma.tile.findMany()
    const seen = new Set()
    for (const tile of tiles) {
      const key = `${tile.coordX},${tile.coordY}`
      expect(seen.has(key)).toBe(false)
      seen.add(key)
    }
  })

  it("has no duplicate names", async () => {
    const tiles = await prisma.tile.findMany()
    const names = new Set()
    for (const tile of tiles) {
      expect(names.has(tile.name)).toBe(false)
      names.add(tile.name)
    }
  })

  it("has valid icons", async () => {
    const tiles = await prisma.tile.findMany()
    for (const tile of tiles) {
      expect(tile.icon).toMatch(/^[a-z0-9]+$/i)
    }
  })

  it("has positive coordinates and loot timestamps", async () => {
    const tiles = await prisma.tile.findMany()
    for (const tile of tiles) {
      expect(tile.coordX).toBeGreaterThanOrEqual(0)
      expect(tile.coordY).toBeGreaterThanOrEqual(0)
      expect(new Date(tile.lastLooted).getTime()).toBeLessThan(
        Date.now() + 1000
      )
    }
  })
})
