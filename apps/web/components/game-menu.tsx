import { useEffect, useState } from "react"
import { Player } from "@/generated/prisma"
import { StoreTile } from "@/stores/tile-store"

import { Avatar, AvatarFallback } from "@last-block/ui/components/avatar"
import { Button } from "@last-block/ui/components/button"

import { getTileById } from "@/lib/db"

export interface GameMenuProps extends React.ComponentProps<"div"> {
  player: Player
}

export default function GameMenu({ player, ...props }: GameMenuProps) {
  const [playerTile, setPlayerTile] = useState<StoreTile>()

  useEffect(() => {
    async function init() {
      try {
        if (!player.tileId) return
        const tile = await getTileById(player.tileId)
        setPlayerTile(tile)
      } catch (err) {
        console.error(err)
      }
    }

    if (player) init()
  }, [player])

  return (
    <div
      className="col-span-3 w-full border border-t-2 border-white bg-zinc-900 text-white"
      {...props}
    >
      <div className="flex flex-row items-start gap-4 p-2">
        {/* Left Section: Avatar and Identity */}
        <div className="flex flex-col items-center gap-1">
          <Avatar className="h-16 w-16 border border-white">
            <AvatarFallback>{player?.name?.[0] || "?"}</AvatarFallback>
          </Avatar>
          <div className="text-sm font-bold text-green-400">{player?.name}</div>
        </div>
        {/* Middle Section: Stats and Last Actions */}
        <div className="flex flex-col items-start gap-1 px-4">
          <div>
            Health: <span className="text-red-400">{player?.health}</span>
          </div>
          <div>
            Energy: <span className="text-yellow-400">{player?.energy}</span>
          </div>
          <div className="mt-2 text-sm">Last Actions:</div>
          <ul className="list-disc pl-4 text-xs">
            <li>Looked around</li>
            <li>Found an old radio</li>
            <li>Heard gunshots nearby</li>
          </ul>
        </div>
        <div className="h-full w-full place-content-center bg-amber-700">
          {playerTile?.description}
        </div>
        <div className="mt-2 flex w-24 flex-col gap-1">
          <Button variant="outline" size="sm">
            Search
          </Button>
          <Button variant="secondary" size="sm">
            Fortify
          </Button>
          <Button variant="ghost" size="sm">
            Skills
          </Button>
        </div>

        {/* Right Section: Tile Activity + Buttons */}
        <div className="flex flex-col gap-2 text-sm">
          <div className="text-white/80">Tile Updates:</div>
          <div className="text-xs text-gray-300">
            - Footsteps nearby
            <br />
            - One zombie spotted
            <br />- Trash pile moved
          </div>
        </div>
      </div>
    </div>
  )
}
