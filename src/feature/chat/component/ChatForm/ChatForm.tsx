import { InputControl } from '@src/component/Form/InputControl/InputControl'
import { Button, InputRightElement, InputGroup, chakra } from '@chakra-ui/react'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider/AuthProvider'
import type { UseChatFormReturn } from '@src/feature/chat/component/ChatForm/useChatForm'

//TODO: 名前をいい感じに変える🤔
export const ChatForm = ({
  form: { control, handleSubmit },
  handleSendChatMessage,
}: Pick<UseChatFormReturn, 'form' | 'handleSendChatMessage'>) => {
  const user = useAuthContext()

  return (
    <chakra.form
      onClick={handleSubmit((input) =>
        handleSendChatMessage({ user, ...input })
      )}
    >
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
