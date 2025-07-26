// components/grid.tsx
"use client"

import { useRouter } from "next/navigation"
import { usePlayerStore } from "@/providers/player-store-provider"
import { useTileStore } from "@/providers/tile-store-provider"

import GameMenu from "./game-menu"
import { SingleTile } from "./single-tile"

export function Grid() {
  const router = useRouter()
  const { tiles } = useTileStore((state) => state)
  const { player } = usePlayerStore((state) => state)

  if (!tiles?.length && player) {
    return <div className="p-4 text-center text-white">Loading map...</div>
  }

  if (!tiles?.length && !player) {
    router.push("/create-character")
  }

  return (
    <div className="mx-auto grid w-3/4 grid-cols-3 justify-center self-center border-2 border-gray-500 bg-teal-900 font-mono text-xl">
      {tiles.map((tile) => {
        const isPlayerHere =
          tile.coordX === player.positionX && tile.coordY === player.positionY
        return (
          <SingleTile key={tile.id} tile={tile} isPlayerHere={isPlayerHere} />
        )
      })}
      <GameMenu player={player} />

      {/* {tiles.map((tile) => {
        const isPlayerHere =
          tile.coordX === player.positionX && tile.coordY === player.positionY
        return (
          <div>
            <div>players</div>
            {tile.players && tile.players[0]?.id}
          </div>
        )
      })} */}
    </div>
  )
}
