import { useForm } from '@src/lib/from/useForm/useForm'
import { useLoading } from '@src/hooks/useLoading/useLoading'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider/AuthProvider'
import { createChatRef } from '@src/feature/chat/constant/chatDatabaseRef'
import { push } from '@firebase/database'
import { useCallback } from 'react'
import { chakra, Flex, IconButton } from '@chakra-ui/react'
import type { CreateChatMessageInput } from '@src/feature/chat/model/Chat'
import {
  createChatMessageDefaultValues,
  createChatMessageSchema,
} from '@src/feature/chat/model/Chat'
import { TextareaControl } from '@src/component/Form/TextareaControl/TextareaControl'
import { SendIcon } from '@src/component/Icon/SendIcon/SendIcon'

type Args = {
  onCompleted: () => void
  onError: () => void
}

export const useCreateChatMessageForm = (
  roomUid: string,
  { onCompleted, onError }: Partial<Args> = {}
) => {
  const { user } = useAuthContext()
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
        const db = createChatRef(roomUid)
        await push(db, input)
        reset()
        onCompleted?.()
      } catch (e) {
        onError?.()
        console.log(e)
      } finally {
        stopLoading()
      }
    },
    [onCompleted, onError, reset, roomUid, startLoading, stopLoading]
  )

  const renderCreateChatMessageForm = useCallback(() => {
    return (
      <chakra.form onClick={handleSubmit(handleCreateChatMessage)}>
        <TextareaControl
          control={control}
          name={'message'}
          h={'80px'}
          resize={'none'}
        />
        <Flex justifyContent={'end'}>
          <IconButton
            type={'submit'}
            size={'xs'}
            aria-label={'チャットを送る'}
            icon={<SendIcon />}
          />
        </Flex>
      </chakra.form>
    )
  }, [control, handleCreateChatMessage, handleSubmit])

  return { renderCreateChatMessageForm } as const
}
