// src/providers/tile-store-provider.tsx
"use client"

import { createContext, useContext, useRef, type ReactNode } from "react"
import {
  createTileStore,
  initTileStore,
  type TileStore,
} from "@/stores/tile-store"
import { useStore } from "zustand"

export type TileStoreApi = ReturnType<typeof createTileStore>

const TileStoreContext = createContext<TileStoreApi | undefined>(undefined)

interface TileStoreProviderProps {
  children: ReactNode
}

export const TileStoreProvider = ({ children }: TileStoreProviderProps) => {
  const storeRef = useRef<TileStoreApi | null>(null)

  if (storeRef.current === null) {
    storeRef.current = createTileStore(initTileStore())
  }

  return (
    <TileStoreContext.Provider value={storeRef.current}>
      {children}
    </TileStoreContext.Provider>
  )
}

export function useTileStore<T>(selector: (store: TileStore) => T): T {
  const store = useContext(TileStoreContext)
  if (!store) {
    throw new Error("useTileStore must be used within a TileStoreProvider")
  }
  return useStore(store, selector)
}
