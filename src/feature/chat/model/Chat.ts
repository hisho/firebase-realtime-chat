import { z } from 'zod'
import { serverTimestamp } from '@firebase/database'
import type { AuthState } from '@src/feature/auth/provider/AuthProvider/AuthProvider'
import type { ToZod } from '@src/lib/zod/types'
import { valueAsDate, valueAsString } from '@hisho/utils'

export type CreateChatMessageInput = {
  message: string
  user: {
    uid: string
    name: string
    avatarUrl: string
  }
  createdAt: unknown
}

export const createChatMessageSchema = z.object<ToZod<CreateChatMessageInput>>({
  message: z.string().min(1).max(100),
  createdAt: z.unknown(),
  user: z.object({
    uid: z.preprocess(
      (v) => valueAsString(v, { defaultValue: '' }),
      z.string()
    ),
    name: z.preprocess(
      (v) => valueAsString(v, { defaultValue: '未設定' }),
      z.string()
    ),
    avatarUrl: z.preprocess(
      (v) => valueAsString(v, { defaultValue: '' }),
      z.string()
    ),
  }),
})

export const createChatMessageDefaultValues = (user: AuthState) => {
  return {
    message: '',
    user: {
      uid: user?.uid ?? '',
      name: user?.displayName ?? '',
      avatarUrl: user?.photoURL ?? '',
    },
    createdAt: serverTimestamp(),
  }
}

export type Chat = {
  message: string
  user: {
    uid: string
    name: string
    avatarUrl: string | null
  }
  createdAt: Date
  key: string
}

export const chatSchema = z.object<ToZod<Chat>>({
  message: z.string(),
  createdAt: z.preprocess(
    (v) => valueAsDate(v, { defaultValue: new Date() }),
    z.date()
  ),
  user: z.object({
    uid: z.string(),
    name: z.string(),
    avatarUrl: z.preprocess(
      (v) => valueAsString(v, { defaultValue: null }),
      z.string().nullable()
    ),
  }),
  key: z.preprocess((v) => valueAsString(v, { defaultValue: '' }), z.string()),
})
