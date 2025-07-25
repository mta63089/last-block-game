// components/single-tile.tsx
"use client"

import { useUser } from "@/context/user-context"
import { Player, type Tile } from "@/generated/prisma"
import { usePlayerStore } from "@/providers/player-store-provider"
import { useTileStore } from "@/providers/tile-store-provider"
import {
  ArrowBigDown,
  ArrowBigLeft,
  ArrowBigRight,
  ArrowBigUp,
} from "lucide-react"

import { Button } from "@last-block/ui/components/button"

import { movePlayer } from "@/lib/move-player"

import { PlayerBadge } from "./player"
import { TileIcon, TileIcons } from "./tile-icons"

export interface TileProps extends React.ComponentProps<"div"> {
  tile: Tile
  isPlayerHere: boolean
  player: Player
}
export function SingleTile({
  tile,
  player,
  isPlayerHere = false,
  ...props
}: TileProps) {
  const { id: userId } = useUser()
  const { setPlayer } = usePlayerStore((state) => state)
  const { tiles, setTiles } = useTileStore((state) => state)

  async function handleMove(direction: "up" | "down" | "left" | "right") {
    try {
      const result = await movePlayer(userId, direction)
      if (result?.player && result?.tiles) {
        setPlayer({ ...result.player }) // trigger reactivity
        setTiles(result.tiles) // ensure new array ref
      }
    } catch (e) {
      console.error("Move failed", e)
    }
  }

  const Icon = TileIcons[tile.icon as TileIcon]
  if (isPlayerHere) {
    return (
      <div className="grid grid-cols-5 border">
        <div className="col-span-5 mx-auto p-1">
          <Button
            variant="outline"
            className="h-6 w-6 cursor-pointer"
            onClick={() => handleMove("up")}
          >
            <ArrowBigUp className="size-6" />
          </Button>
        </div>
        <div className="flex w-full items-center p-1">
          <div className="w-1/5">
            <Button
              variant="outline"
              className="h-6 w-6 cursor-pointer"
              onClick={() => handleMove("left")}
            >
              <ArrowBigLeft className="size-6" />
            </Button>
          </div>
        </div>
        <div className="col-span-3 mx-auto flex flex-col items-center p-1">
          {Icon ? (
            <div className="size-16 bg-red-400/50">
              <Icon className="size-16 text-white" />
            </div>
          ) : null}
          <strong>{tile.name}</strong>
          <div className="text-green-400">
            {tile.coordX} , {tile.coordY}{" "}
          </div>
        </div>
        <div className="flex w-full items-center justify-end p-1">
          <Button
            variant="outline"
            className="h-6 w-6 cursor-pointer"
            onClick={() => handleMove("right")}
          >
            <ArrowBigRight className="size-6" />
          </Button>
        </div>
        <div className="col-span-5 flex w-full items-end justify-center p-1">
          <Button
            variant="outline"
            className="h-6 w-6 cursor-pointer"
            onClick={() => handleMove("down")}
          >
            <ArrowBigDown className="size-6" />
          </Button>
        </div>
      </div>
    )
  }
  return (
    <div
      key={`${tile.coordX}-${tile.coordY}`}
      className="relative flex flex-1 flex-col items-center justify-center border p-2"
    >
      {Icon ? (
        <div className="size-16 bg-red-400/50">
          <Icon className="size-16 text-white" />
        </div>
      ) : null}
      <strong>{tile.name}</strong>
      <div className="text-green-400">
        {tile.coordX} , {tile.coordY}{" "}
      </div>
      {isPlayerHere && <PlayerBadge player={player} />}
    </div>
  )
}
