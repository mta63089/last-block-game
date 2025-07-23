"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@last-block/ui/components/button"

import { signOut, useSession } from "@/lib/auth-client"
import { Icons } from "@/components/icons"

export default function GamePage() {
  const router = useRouter()
  const { data: session, isPending } = useSession()

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/sign-in")
    }
  }, [isPending, session, router])

  if (isPending)
    return (
      <div className="mx-auto flex h-screen max-w-md flex-col items-center justify-center space-y-4 p-6 text-white">
        <Icons.spinner className="size-8 text-green-500" />
        <p className="mt-8 text-center text-white">Loading...</p>
      </div>
    )
  if (!session?.user)
    return (
      <div className="mx-auto flex h-screen max-w-md flex-col items-center justify-center space-y-4 p-6 text-white">
        <Icons.spinner className="size-8 text-green-500" />
        <p className="mt-8 text-center text-white">Redirecting...</p>
      </div>
    )

  //add-start: destructure user from session
  const { user } = session

  // init game state
  // see if there is players

  if (!user) {
    // take to character creation
  }
  return (
    <main className="mx-auto flex h-screen max-w-md flex-col items-center justify-center space-y-4 p-6 text-white">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {user.name || "User"}!</p>
      <p>Email: {user.email}</p>
      <Button
        onClick={() => signOut()}
        className="w-full rounded-md bg-white px-4 py-2 font-medium text-black hover:bg-gray-200"
      >
        Sign Out
      </Button>
    </main>
  )
}
