import { z } from 'zod'
import { Timestamp } from '@firebase/firestore'
import type { GlobalAuthState } from '@src/feature/auth/provider/AuthProvider/AuthProvider'
import type { ToZod } from '@src/lib/zod/types'
import { valueAsDate } from '@hisho/utils'

export type CreateRoomInput = {
  name: string
  description: string
  createdAt: unknown
  updatedAt: unknown
  ownerUid: string
}

export const createRoomSchema = z.object<ToZod<CreateRoomInput>>({
  name: z.string().min(1).max(100),
  description: z.string().min(0).max(100),
  createdAt: z.unknown(),
  updatedAt: z.unknown(),
  ownerUid: z.string(),
})

export const createRoomDefaultValues = (user: GlobalAuthState['user']) => {
  return {
    name: '',
    description: '',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    ownerUid: user?.uid ?? '',
  }
}

export type Room = {
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
  ownerUid: string
  uid: string
}

export const roomSchema = z.object<ToZod<Room>>({
  name: z.string(),
  description: z.string(),
  createdAt: z.preprocess(
    (v) => valueAsDate(v, { defaultValue: new Date() }),
    z.date()
  ),
  updatedAt: z.preprocess(
    (v) => valueAsDate(v, { defaultValue: new Date() }),
    z.date()
  ),
  ownerUid: z.string(),
  uid: z.string(),
})
