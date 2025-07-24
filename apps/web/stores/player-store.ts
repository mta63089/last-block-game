import { Player } from "@/generated/prisma"
import { Coordinates } from "@/types"
import { createStore } from "zustand"

export type PlayerState = {
  player: Player
}

export type PlayerActions = {
  setPlayer: (player: Player) => void
  updatePosition: (coords: Coordinates) => void
  updateStats: (changes: Partial<Pick<Player, "energy" | "health">>) => void
}

export type PlayerStore = PlayerState & PlayerActions

export const defaultInitState: PlayerState = {
  player: {
    id: "default-player",
    tileId: "default-tile",
    userId: "default-user",
    name: "DefaultPlayer",
    avatarUrl: "/avatars/fallback.png",
    class: "burglar",
    energy: 25,
    health: 100,
    positionX: 3,
    positionY: 3,
  },
}

export const initPlayerStore = (): PlayerState => {
  return { ...defaultInitState }
}

export const createPlayerStore = (
  initState: PlayerState = defaultInitState
) => {
  return createStore<PlayerStore>()((set) => ({
    ...initState,
    setPlayer: (player) => set(() => ({ player })),
    updatePosition: (coords) =>
      set((state) => ({
        player: {
          ...state.player,
          positionX: coords.x,
          positionY: coords.y,
        },
      })),
    updateStats: (changes) =>
      set((state) => ({
        player: {
          ...state.player,
          ...changes,
        },
      })),
  }))
}
