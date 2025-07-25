// stores/tile-store.ts
import { Player, Tile } from "@/generated/prisma"
import { createStore } from "zustand"

export type StoreTile = Tile & { players?: Player[] }
export type TileState = {
  tiles: StoreTile[]
}

export type TileActions = {
  setTiles: (tiles: Tile[]) => void
  updateTile: (tile: Tile) => void
  getPlayerTile: (playerId: string) => StoreTile | undefined
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
  createStore<TileStore>()((set, get) => ({
    ...initState,
    setTiles: (tiles) => set({ tiles: sortTiles(tiles) }),
    updateTile: (tile) =>
      set((state) => {
        const filtered = state.tiles.filter((t) => t.id !== tile.id)
        return { tiles: sortTiles([...filtered, tile]) }
      }),
    getPlayerTile: (playerId) => {
      const { tiles } = get()
      console.log("store stuff\n\nplayerId:\n", playerId, "\n", tiles)
      return tiles.find((tile) =>
        tile.players?.some((player) => {
          console.log(
            "\n\ntile.players?.some((player=> player.id === playerId))\n\nplayer.id:",
            player.id,
            "\n\nplayerId:",
            playerId
          )
          return player.id === playerId
        })
      )
    },
  }))
