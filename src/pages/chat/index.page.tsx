import type { NextPageWithLayout } from '@src/pages/_app.page'
import { BaseLayout } from '@src/layout/BaseLayout/BaseLayout'
import { AuthGuard } from '@src/feature/auth/component/AuthGuard/AuthGuard'
import { push, serverTimestamp, set } from '@firebase/database'
import { Box, Button } from '@chakra-ui/react'
import { useForm } from '@src/lib/from/useForm/useForm'
import { z } from 'zod'
import { InputControl } from '@src/component/Form/InputControl/InputControl'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider/AuthProvider'
import { useLoading } from '@src/hooks/useLoading/useLoading'
import { useSubscribeChat } from '@src/feature/chat/hooks/useSubscribeChat/useSubscribeChat'
import { chatDatabaseRef } from '@src/feature/chat/constant/chatDatabaseRef'

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

const Page: NextPageWithLayout = () => {
  const user = useAuthContext()
  const { chats } = useSubscribeChat()

  const { control, handleSubmit, reset } = useForm<Input>({
    defaultValues: {
      message: '',
    },
    schema,
  })

  const { stopLoading, startLoading, isLoading } = useLoading()
  const onSubmit = async (input: Input) => {
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

  return (
    <div>
      {chats.map((message, index) => (
        <Box key={`${message}_${index}`}>{message}</Box>
      ))}
      <InputControl control={control} name={'message'} />
      <Button onClick={handleSubmit(onSubmit)} isLoading={isLoading}>
        送信
      </Button>
    </div>
  )
}

Page.getLayout = (page) => {
  return (
    <BaseLayout>
      <AuthGuard>{page}</AuthGuard>
    </BaseLayout>
  )
}

export default Page
