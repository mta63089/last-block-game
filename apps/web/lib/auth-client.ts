import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({})

export const { signIn, signUp, signOut, useSession } = authClient

// export type Session = typeof authClient.$Infer.Session
// export type User = typeof authClient.$Infer.Session.user
