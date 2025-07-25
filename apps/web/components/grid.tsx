// components/grid.tsx
"use client"

import { usePlayerStore } from "@/providers/player-store-provider"
import { useTileStore } from "@/providers/tile-store-provider"

import { SingleTile } from "./single-tile"

export function Grid() {
  const tiles = useTileStore((state) => state.tiles)
  const player = usePlayerStore((state) => state.player)

  if (!tiles?.length || !player) {
    return <div className="p-4 text-center text-white">Loading map...</div>
  }

  return (
    <div className="mx-auto grid h-3/4 w-3/4 grid-cols-3 justify-center self-center border-2 border-gray-500 bg-teal-900">
      {tiles.map((tile) => {
        const isPlayerHere =
          tile.coordX === player.positionX && tile.coordY === player.positionY

        return (
          <SingleTile
            key={tile.id}
            tile={tile}
            player={player}
            isPlayerHere={isPlayerHere}
          />
        )
      })}
    </div>
  )
}
