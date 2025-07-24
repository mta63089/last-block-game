"use client"

import { useEffect } from "react"
import { useUser } from "@/context/user-context"
import { usePlayerStore } from "@/providers/player-store-provider"
import { useTileStore } from "@/providers/tile-store-provider"

import { getPlayerAndTiles } from "@/lib/db"
import { Grid } from "@/components/grid"

export default function GamePage() {
  const { id: userId } = useUser()
  const { setPlayer } = usePlayerStore((state) => state)
  const { setTiles } = useTileStore((state) => state)

  useEffect(() => {
    async function init() {
      const { player, tiles } = await getPlayerAndTiles(userId)
      setPlayer(player)
      setTiles(tiles)
    }

    init()
  }, [userId, setPlayer, setTiles])

  return <Grid />
}
