"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/user-context"
import { usePlayerStore } from "@/providers/player-store-provider"
import { useTileStore } from "@/providers/tile-store-provider"

import { Button } from "@last-block/ui/components/button"

import { getPlayerAndTiles } from "@/lib/db"
import { resetPlayerPosition } from "@/lib/move-player"
import { Grid } from "@/components/grid"

export default function GamePage() {
  const router = useRouter()
  const { id: userId } = useUser()
  const { player, setPlayer } = usePlayerStore((state) => state)
  const { tiles, setTiles } = useTileStore((state) => state)

  useEffect(() => {
    async function init() {
      try {
        const { player, tiles } = await getPlayerAndTiles(userId)
        setPlayer(player)
        setTiles(tiles)
      } catch (err) {
        if (err instanceof Error && err.message === "Player not found") {
          router.push("/create-character")
        } else {
          console.error("Unexpected error loading game data:", err)
        }
      }
    }

    if (userId) init()
  }, [userId, setPlayer, setTiles, router])

  const handleReset = () => {
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
      <div className="border-border top-30 fixed right-1 flex flex-col gap-4 border p-2">
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
