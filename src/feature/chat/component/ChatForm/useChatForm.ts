import { useForm } from '@src/lib/from/useForm/useForm'
import { useLoading } from '@src/hooks/useLoading/useLoading'
import { chatDatabaseRef } from '@src/feature/chat/constant/chatDatabaseRef'
import { push, serverTimestamp, set } from '@firebase/database'
import { z } from 'zod'
import type { AuthState } from '@src/feature/auth/provider/AuthProvider/AuthProvider'

const chatSchema = z.object({
  user: z.object({
    name: z.preprocess((v) => v ?? '未設定', z.string()),
  }),
  message: z.string().min(1).max(100),
  createdAt: z.unknown(),
})

type Input = {
  message: string
}

const schema = z.object({
  message: z.string().min(1).max(100),
})

export const useChatForm = () => {
  const form = useForm<Input>({
    defaultValues: {
      message: '',
    },
    schema,
  })

  const { reset } = form

  const { stopLoading, startLoading } = useLoading()
  const handleSendChatMessage = async ({
    user,
    ...input
  }: Input & { user: AuthState }) => {
    startLoading()
    try {
      const db = chatDatabaseRef()
      const newRef = await push(db)
      const data = chatSchema.parse({
        user: {
          name: user?.displayName ?? null,
        },
        createdAt: serverTimestamp(),
        message: input.message,
      })
      await set(newRef, data)
      reset()
    } catch (e) {
      console.log(e)
    } finally {
      stopLoading()
    }
  }

  return { handleSendChatMessage, form } as const
}

export type UseChatFormReturn = ReturnType<typeof useChatForm>
