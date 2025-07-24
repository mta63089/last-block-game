// src/providers/player-store-provider.tsx
"use client"

import { createContext, useContext, useRef, type ReactNode } from "react"
import {
  createPlayerStore,
  initPlayerStore,
  type PlayerStore,
} from "@/stores/player-store"
import { useStore } from "zustand"

export type PlayerStoreApi = ReturnType<typeof createPlayerStore>

const PlayerStoreContext = createContext<PlayerStoreApi | undefined>(undefined)

interface PlayerStoreProviderProps {
  children: ReactNode
}

export const PlayerStoreProvider = ({ children }: PlayerStoreProviderProps) => {
  const storeRef = useRef<PlayerStoreApi | null>(null)

  if (storeRef.current === null) {
    storeRef.current = createPlayerStore(initPlayerStore())
  }

  return (
    <PlayerStoreContext.Provider value={storeRef.current}>
      {children}
    </PlayerStoreContext.Provider>
  )
}

export function usePlayerStore<T>(selector: (store: PlayerStore) => T): T {
  const store = useContext(PlayerStoreContext)
  if (!store) {
    throw new Error("usePlayerStore must be used within a PlayerStoreProvider")
  }
  return useStore(store, selector)
}
