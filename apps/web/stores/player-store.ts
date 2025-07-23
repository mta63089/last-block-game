import { Player } from "@/generated/prisma"
import { create } from "zustand"

import { isAdjacent } from "@/lib/grid"

interface PlayerState {
  player: Player
  setPlayer: (p: Player) => void
  move: (to: { x: number; y: number }) => void
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  player: {
    id: "mta630",
    tileId: "default",
    userId: "mta630",
    name: "Survivor",
    avatarUrl: "/icons/avatar.svg",
    class: "burglar",
    energy: 25,
    health: 100,
    positionX: 3,
    positionY: 3,
  },
  setPlayer: (p) => set({ player: p }),
  move: (to) => {
    const player = get().player
    if (
      player.energy <= 0 ||
      !isAdjacent(player.positionX, player.positionY, to)
    )
      return
    set({
      player: {
        ...player,
        positionX: to.x,
        positionY: to.y,
        energy: player.energy - 1,
      },
    })
  },
}))
