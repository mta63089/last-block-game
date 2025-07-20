import { samplePlayer, samplePlayer2 } from "@/data/players"
import { Building2 } from "lucide-react"

import { Player } from "@/types/player"
import { PlayerBadge } from "@/components/player"

interface Coordinates {
  x: number
  y: number
}

interface Icon {
  src: string // URL or path to SVG
  alt: string
}

interface Fortification {
  name: string
  durability: number
  effects: string[]
  lastRepaired: Date
}

interface LootItem {
  name: string
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
  dropRate: number // 0.0 to 1.0
}

interface LootTable {
  items: LootItem[]
}

interface Skill {
  name: string
  level: number
  effects: string[]
}

interface PlayerStats {
  strength: number
  agility: number
  intelligence: number
  endurance: number
}

interface Cell {
  name: string
  icon: React.ReactNode
  players: Player[]
  // lootTable: LootTable
  // lastLooted: Date
  // fortifications: Fortification[]
  description: string
  coordinates: Coordinates
  searchable: boolean
}

function CellComponent({ cell }: { cell: Cell }) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between border border-zinc-700 bg-zinc-900 p-2 font-mono transition-colors hover:bg-zinc-800">
      <div className="flex h-full flex-col items-center justify-center">
        {cell.icon}
        <span className="text-2xl text-white">{cell.name}</span>
        {cell.players.map((player) => {
          return (
            <div className="py-1">
              <PlayerBadge player={player} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Grid({ cells }: { cells: Cell[] }) {
  return (
    <div className="grid h-3/4 w-3/4 grid-cols-3 bg-teal-900">
      {cells.map((cell, i) => (
        <CellComponent key={i} cell={cell} />
      ))}
    </div>
  )
}

export default function HomePage() {
  const dummyCell: Cell = {
    name: "John's Jewelry",
    icon: <Building2 className="size-24" />,
    players: [samplePlayer, samplePlayer2],
    lootTable: {
      items: [
        { name: "Gold Ring", rarity: "rare", dropRate: 0.2 },
        { name: "Silver Watch", rarity: "uncommon", dropRate: 0.4 },
      ],
    },
    lastLooted: new Date(),
    fortifications: [
      {
        name: "Steel Bars",
        durability: 80,
        effects: ["block entry"],
        lastRepaired: new Date(),
      },
    ],
    description: "A small, looted jewelry store downtown.",
    coordinates: { x: 0, y: 0 },
    tags: ["commercial"],
    searchable: true,
    dangerous: false,
  }

  const gridCells = Array.from({ length: 9 }, (_, i) => ({
    ...dummyCell,
    name: `Block ${i + 1}`,
    coordinates: { x: i % 3, y: Math.floor(i / 3) },
  }))

  return (
    <div className="flex h-full w-full items-center justify-center bg-black">
      <Grid cells={gridCells} />
    </div>
  )
}
