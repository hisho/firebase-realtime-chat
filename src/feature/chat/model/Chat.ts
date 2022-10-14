import { z } from 'zod'
import { serverTimestamp } from '@firebase/database'
import type { AuthState } from '@src/feature/auth/provider/AuthProvider/AuthProvider'

export type CreateChatMessageInput = {
  message: string
  user: {
    name: string
    avatarUrl: string
  }
  createdAt: unknown
}

export const createChatMessageSchema = z.object({
  message: z.string().min(1).max(100),
  createdAt: z.unknown(),
  user: z.object({
    name: z.preprocess((v) => v || '未設定', z.string()),
    avatarUrl: z.string(),
  }),
})

export const createChatMessageDefaultValues = (user: AuthState) => {
  return {
    message: '',
    user: {
      name: user?.displayName ?? '',
      avatarUrl: user?.photoURL ?? '',
    },
    createdAt: serverTimestamp(),
  }
}
