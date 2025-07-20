import { Player } from "@/types/player"

export const samplePlayer: Player = {
  id: "mta630",
  name: "mta630",
  class: "police",
  avatarUrl: "/avatars/mta630.png",
  position: { x: 1, y: 2 },
  health: { current: 10, max: 20 },
  energy: { current: 20, max: 30 },
}

export const samplePlayer2: Player = {
  id: "test-user1",
  name: "test-user1",
  class: "zombie",
  avatarUrl: "/avatars/test-user1.png",
  position: { x: 1, y: 2 },
  health: { current: 10, max: 20 },
  energy: { current: 20, max: 30 },
}

export const samplePlayer3: Player = {
  id: "test-user2",
  name: "test-user2",
  class: "zombie",
  avatarUrl: "/avatars/test-user2.png",
  position: { x: 1, y: 2 },
  health: { current: 20, max: 20 },
  energy: { current: 20, max: 30 },
}
