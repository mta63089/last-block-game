// stores/tile-store.ts
import { Tile } from "@/generated/prisma"
import { createStore } from "zustand"

export type TileState = {
  tiles: Tile[]
}

export type TileActions = {
  setTiles: (tiles: Tile[]) => void
  updateTile: (tile: Tile) => void
}

function sortTiles(tiles: Tile[]): Tile[] {
  return [...tiles].sort((a, b) => {
    if (a.coordY !== b.coordY) return a.coordY - b.coordY
    return a.coordX - b.coordX
  })
}

export type TileStore = TileState & TileActions

export const defaultInitState: TileState = {
  tiles: [],
}

export const initTileStore = (): TileState => {
  return { ...defaultInitState }
}

export const createTileStore = (initState: TileState = defaultInitState) =>
  createStore<TileStore>()((set) => ({
    ...initState,
    setTiles: (tiles) => set({ tiles: sortTiles(tiles) }),
    updateTile: (tile) =>
      set((state) => {
        const filtered = state.tiles.filter((t) => t.id !== tile.id)
        return { tiles: sortTiles([...filtered, tile]) }
      }),
  }))
