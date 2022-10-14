import { z } from 'zod'
import { serverTimestamp } from '@firebase/database'
import type { AuthState } from '@src/feature/auth/provider/AuthProvider/AuthProvider'
import type { ToZod } from '@src/lib/zod/types'
import { valueAsString } from '@hisho/utils'

export type CreateChatMessageInput = {
  message: string
  user: {
    name: string
    avatarUrl: string
  }
  createdAt: unknown
}

export const createChatMessageSchema = z
  .object<ToZod<CreateChatMessageInput>>({
    message: z.string().min(1).max(100),
    createdAt: z.unknown(),
    user: z.object({
      name: z.string(),
      avatarUrl: z.string(),
    }),
  })
  .transform(({ user, ...others }) => ({
    ...others,
    user: {
      ...user,
      name: valueAsString(user.name, { defaultValue: '未設定' }),
    },
  }))

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
