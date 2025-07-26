// components/single-tile.tsx
"use client"

import { useUser } from "@/context/user-context"
import { usePlayerStore } from "@/providers/player-store-provider"
import { useTileStore } from "@/providers/tile-store-provider"
import { StoreTile } from "@/stores/tile-store"
import {
  ArrowBigDown,
  ArrowBigLeft,
  ArrowBigRight,
  ArrowBigUp,
} from "lucide-react"

import { Button } from "@last-block/ui/components/button"

import { movePlayer, toggleInterior } from "@/lib/move-player"

import { PlayerBadge } from "./player"
import { TileIcon, TileIcons } from "./tile-icons"

export interface TileProps extends React.ComponentProps<"div"> {
  tile: StoreTile
  isPlayerHere: boolean
}
export function SingleTile({
  tile,
  isPlayerHere = false,
  ...props
}: TileProps) {
  const { id: userId } = useUser()
  const { player, setPlayer } = usePlayerStore((state) => state)
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

  async function handleInteriorToggle() {
    try {
      const result = await toggleInterior(userId)
      if (result?.player && result?.tiles) {
        setPlayer({ ...result.player }) // trigger reactivity
      }
    } catch (e) {
      console.error("Move failed", e)
    }
  }

  const Icon = TileIcons[tile.icon as TileIcon]

  if (isPlayerHere && player.isInterior) {
    return (
      <div className="grid h-64 grid-cols-5 items-center border border-amber-500">
        <div className="col-span-5 mx-auto flex flex-col items-center p-1">
          {Icon ? (
            <div className="size-24 border bg-green-600 p-2">
              <Icon className="size-20 text-white" />
            </div>
          ) : null}
          <strong>{tile.name}</strong>
          {tile.players && tile.players.length > 0 && (
            <div className="mt-2 flex flex-wrap justify-center gap-1">
              {tile.players.map((p) => (
                <PlayerBadge key={p.id} player={p} />
              ))}
            </div>
          )}
        </div>
        <Button
          className="relative bottom-1 left-1"
          onClick={handleInteriorToggle}
        >
          Exit
        </Button>
      </div>
    )
  }

  if (isPlayerHere) {
    return (
      <div className="grid h-64 grid-cols-5 border border-amber-500">
        <div className="left-200 top-100 absolute">
          interior: {tile.hasInterior}
        </div>

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
            <div className="size-24 border bg-green-600 p-2">
              <Icon className="size-20 text-white" />
            </div>
          ) : null}
          <strong>{tile.name}</strong>
          {tile.players && tile.players.length > 0 && (
            <div className="mt-2 flex flex-wrap justify-center gap-1">
              {tile.players.map((p) => (
                <PlayerBadge key={p.id} player={p} />
              ))}
            </div>
          )}
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
        <Button
          onClick={handleInteriorToggle}
          variant="outline"
          className="relative bottom-40 left-80"
        >
          Enter
        </Button>
      </div>
    )
  }
  return (
    <div
      key={`${tile.coordX}-${tile.coordY}`}
      className="relative flex h-64 flex-1 flex-col items-center justify-center border p-2"
    >
      <div className="relative left-0 top-0">interior: {tile.hasInterior}</div>
      {Icon ? (
        <div className="size-24 border bg-green-600/20 p-2">
          <Icon className="size-20 text-white" />
        </div>
      ) : null}
      <strong>{tile.name}</strong>
      {tile.players && tile.players.length > 0 && (
        <div className="mt-2 flex flex-col flex-wrap justify-center gap-1">
          {tile.players.map((p) => (
            <PlayerBadge key={p.id} player={p} />
          ))}
        </div>
      )}
    </div>
  )
}
