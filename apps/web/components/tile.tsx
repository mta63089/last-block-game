import { usePlayerStore } from "@/stores/player-store"
import { Tile } from "@/types"

import { isAdjacent } from "@/lib/grid"

import { PlayerBadge } from "./player"

export function TileComponent({ tile }: { tile: Tile }) {
  const player = usePlayerStore((s) => s.player)
  const move = usePlayerStore((s) => s.move)

  const isCurrent =
    tile.coordinates.x === player.position.x &&
    tile.coordinates.y === player.position.y
  const canMove = isAdjacent(player.position, tile.coordinates)

  const handleMove = () => {
    if (!isCurrent && canMove) move(tile.coordinates)
  }

  return (
    <div
      className="relative flex h-full w-full cursor-pointer flex-col justify-between border border-zinc-700 bg-zinc-900 p-2 font-mono transition-colors hover:bg-zinc-800"
      onClick={handleMove}
    >
      <div className="flex h-full flex-col items-center justify-center">
        {tile.icon}
        <span className="text-2xl text-white">{tile.name}</span>
        {tile.players.map((p) => (
          <div key={p.id} className="py-1">
            <PlayerBadge player={p} />
          </div>
        ))}
      </div>
    </div>
  )
}
