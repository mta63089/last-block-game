"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { UserContext } from "@/context/user-context"
import { PlayerStoreProvider } from "@/providers/player-store-provider"
import { TileStoreProvider } from "@/providers/tile-store-provider"

import { useSession } from "@/lib/auth-client"
import { Icons } from "@/components/icons"

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { data: session, isPending } = useSession()

  useEffect(() => {
    if (isPending) return
    if (!session?.user) router.push("/sign-in")
  }, [session, isPending, router])

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Icons.spinner className="size-8 animate-spin text-green-500" />
      </div>
    )
  }

  return (
    <UserContext.Provider value={{ id: session?.user.id ?? "undefined" }}>
      <PlayerStoreProvider>
        <TileStoreProvider>
          <div className="flex h-svh w-full p-4">{children}</div>
        </TileStoreProvider>
      </PlayerStoreProvider>
    </UserContext.Provider>
  )
}
