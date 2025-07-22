import { TileIcon } from "@/components/tile-icons"

export interface Coordinates {
  x: number
  y: number
}

export interface Player {
  id: string
  name: string
  avatarUrl: string
  class:
    | "zombie"
    | "firefighter"
    | "police"
    | "burglar"
    | "engineer"
    | "doctor"
    | "fast-food-employee"
    | "student"
  energy: number
  items: Item[]
  health: number
  position: Coordinates
}

export interface Item {
  id: string
  name: string
  damageModifier?: number
  type: "weapon" | "tool" | "consumable" | "valuable" | "material" | "equipment"
  weight: number
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
}

export interface Tile {
  id: string
  icon: TileIcon
  name: string
  description: string
  skills: Skill[]
  players: Player[]
  lootTable: { item: Item; rate: number }[]
  lastLooted: string
  coordinates: { x: number; y: number }
}

interface Skill {
  name: string
  description: string
  effect: (player: Player) => void
}
