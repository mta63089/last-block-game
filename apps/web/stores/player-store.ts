import { create } from "zustand"

import { isAdjacent } from "@/lib/grid"

import { Player } from "../types"

interface PlayerState {
  player: Player
  setPlayer: (p: Player) => void
  move: (to: { x: number; y: number }) => void
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  player: {
    id: "1",
    name: "Survivor",
    avatarUrl: "/icons/avatar.svg",
    class: "zombie",
    energy: 5,
    health: 100,
    position: { x: 4, y: 5 },
  },
  setPlayer: (p) => set({ player: p }),
  move: (to) => {
    const player = get().player
    if (player.energy <= 0 || !isAdjacent(player.position, to)) return
    set({ player: { ...player, position: to, energy: player.energy - 1 } })
  },
}))
