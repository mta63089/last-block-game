//components/player.tsx
import type { ComponentProps } from "react"
import Image from "next/image"
import { Player } from "@/generated/prisma"
import { PersonStandingIcon } from "lucide-react"

import { Badge } from "@last-block/ui/components/badge"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@last-block/ui/components/hover-card"

import { cn } from "@/lib/utils"

import { Icons } from "./icons"

export type StatusProps = ComponentProps<typeof Badge> & {
  player: Player
}

export const PlayerBadge = ({
  player,
  className = "",
  ...props
}: StatusProps) => {
  let borderColor = "border-gray-400"
  let playerIcon
  if (player.class === "zombie") {
    playerIcon = <Icons.zombie />
    borderColor = "border-red-400"
  } else {
    playerIcon = <PersonStandingIcon />
  }

  // if class = zombie
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Badge
          className={cn(
            "flex items-center gap-2 border border-red-400",
            "group",
            borderColor,
            className
          )}
          variant="secondary"
          {...props}
        >
          {playerIcon}
          {player.name}
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="">
          <Image
            alt={`${player.name} avatar`}
            src={player.avatarUrl}
            width={100}
            height={100}
          />
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
