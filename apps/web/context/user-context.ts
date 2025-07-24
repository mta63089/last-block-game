// context/user-context.ts
"use client"

import { createContext, useContext } from "react"

export const UserContext = createContext<{ id: string } | null>(null)
export const useUser = () => {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error("useUser must be used within UserContext.Provider")
  return ctx
}
