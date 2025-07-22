import { usePlayerStore } from "@/stores/player-store"
import { Tile } from "@/types"

import { getSurroundingCoordinates } from "@/lib/grid"

import { TileComponent } from "./tile"

export function Grid({ allTiles }: { allTiles: Tile[] }) {
  const player = usePlayerStore((s) => s.player)
  const visibleCoords = getSurroundingCoordinates(player.position)

  const visibleTiles = visibleCoords.map((coord) =>
    allTiles.find(
      (tile) => tile.coordinates.x === coord.x && tile.coordinates.y === coord.y
    )
  )

  return (
    <div className="grid h-3/4 w-3/4 grid-cols-3 bg-teal-900">
      {visibleTiles.map(
        (tile, i) => tile && <TileComponent key={i} tile={tile} />
      )}
    </div>
  )
}
