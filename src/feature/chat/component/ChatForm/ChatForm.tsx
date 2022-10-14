import { InputControl } from '@src/component/Form/InputControl/InputControl'
import { Button, InputRightElement, InputGroup, chakra } from '@chakra-ui/react'
import { useForm } from '@src/lib/from/useForm/useForm'
import { useLoading } from '@src/hooks/useLoading/useLoading'
import { chatDatabaseRef } from '@src/feature/chat/constant/chatDatabaseRef'
import { push, serverTimestamp, set } from '@firebase/database'
import { z } from 'zod'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider/AuthProvider'

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

//TODO: 名前をいい感じに変える🤔
export const ChatForm = () => {
  const user = useAuthContext()
  const { control, handleSubmit, reset } = useForm<Input>({
    defaultValues: {
      message: '',
    },
    schema,
  })

  const { stopLoading, startLoading } = useLoading()
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
    <chakra.form onClick={handleSubmit(onSubmit)}>
      <InputGroup size="md">
        <InputControl control={control} name={'message'} />
        <InputRightElement width="4.5rem">
          <Button w={'full'} type={'submit'}>
            送信
          </Button>
        </InputRightElement>
      </InputGroup>
    </chakra.form>
  )
}
