export interface Player {
  id: string
  name: string
  class:
    | "zombie"
    | "firefighter"
    | "police"
    | "burglar"
    | "engineer"
    | "doctor"
    | "fast-food-employee"
    | "student"
  avatarUrl: string
  // stats?: PlayerStats  TODO implement me
  // inventory: LootItem[] TODO implement me
  // skills: Skill[]
  position: Coordinates
  health: Health
  energy: Energy
}
