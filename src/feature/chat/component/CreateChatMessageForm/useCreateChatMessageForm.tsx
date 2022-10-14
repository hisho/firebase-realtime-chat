import { useForm } from '@src/lib/from/useForm/useForm'
import { useLoading } from '@src/hooks/useLoading/useLoading'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider/AuthProvider'
import { chatDatabaseRef } from '@src/feature/chat/constant/chatDatabaseRef'
import { push } from '@firebase/database'
import { useCallback } from 'react'
import { Button, chakra, InputGroup, InputRightElement } from '@chakra-ui/react'
import { InputControl } from '@src/component/Form/InputControl/InputControl'
import type { CreateChatMessageInput } from '@src/feature/chat/model/Chat'
import {
  createChatMessageDefaultValues,
  createChatMessageSchema,
} from '@src/feature/chat/model/Chat'

export const useCreateChatMessageForm = () => {
  const user = useAuthContext()
  const form = useForm<CreateChatMessageInput>({
    defaultValues: createChatMessageDefaultValues(user),
    schema: createChatMessageSchema,
  })

  const { reset, handleSubmit, control } = form

  const { stopLoading, startLoading } = useLoading()

  const handleCreateChatMessage = useCallback(
    async (input: CreateChatMessageInput) => {
      startLoading()
      try {
        const db = chatDatabaseRef()
        await push(db, input)
        reset()
      } catch (e) {
        console.log(e)
      } finally {
        stopLoading()
      }
    },
    [reset, startLoading, stopLoading]
  )

  const renderCreateChatMessageForm = useCallback(() => {
    return (
      <chakra.form onClick={handleSubmit(handleCreateChatMessage)}>
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
  }, [control, handleCreateChatMessage, handleSubmit])

  return { renderCreateChatMessageForm } as const
}
