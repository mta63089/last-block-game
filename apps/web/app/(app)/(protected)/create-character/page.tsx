"use client"

import { useUser } from "@/context/user-context"

import CreatePlayer from "@/components/player-create-form"

export default function CreateCharacterPage() {
  const { id } = useUser()

  return (
    <>
      <CreatePlayer userId={id} />
    </>
  )
}
