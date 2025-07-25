"use client"

import { useEffect } from "react"
import { useUser } from "@/context/user-context"
import { usePlayerStore } from "@/providers/player-store-provider"
import { useTileStore } from "@/providers/tile-store-provider"

import { Button } from "@last-block/ui/components/button"

import { getPlayerAndTiles } from "@/lib/db"
import { resetPlayerPosition } from "@/lib/move-player"
import { Grid } from "@/components/grid"

export default function GamePage() {
  const { id: userId } = useUser()
  const { player, setPlayer } = usePlayerStore((state) => state)
  const { tiles, setTiles } = useTileStore((state) => state)

  useEffect(() => {
    async function init() {
      const { player, tiles } = await getPlayerAndTiles(userId)
      setPlayer(player)
      setTiles(tiles)
    }

    init()
  }, [userId, setPlayer, setTiles])

  const handleReset = () => {
    console.log(userId)
    resetPlayerPosition(userId)
  }
  const displayStore = () => {
    console.log(
      "TILES STORE\n------------------------------------------------------\n",
      tiles
    )
    console.log(
      "-----------------------------------------------------\nPLAYERS STORE\n-------------------------------------------------------------------------",
      player
    )
  }
  return (
    <>
      <div className="border-border absolute bottom-1 right-10 flex gap-4 border p-2">
        <Button variant="outline" onClick={displayStore} className="">
          DISPLAY STORES
        </Button>
        <Button variant="secondary" onClick={handleReset} className="">
          Reset Position
        </Button>
      </div>
      <Grid />
    </>
  )
}
