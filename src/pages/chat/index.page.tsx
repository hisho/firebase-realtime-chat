import type { NextPageWithLayout } from '@src/pages/_app.page'
import { BaseLayout } from '@src/layout/BaseLayout/BaseLayout'
import { AuthGuard } from '@src/feature/auth/component/AuthGuard/AuthGuard'
import { Box } from '@chakra-ui/react'
import { useSubscribeChat } from '@src/feature/chat/hooks/useSubscribeChat/useSubscribeChat'
import { ChatForm } from '@src/feature/chat/component/ChatForm/ChatForm'
import { useChatForm } from '@src/feature/chat/component/ChatForm/useChatForm'

const Page: NextPageWithLayout = () => {
  const { chats } = useSubscribeChat()
  const { form, handleSendChatMessage } = useChatForm()

  return (
    <div>
      {chats.map((message, index) => (
        <Box key={`${message}_${index}`}>{message}</Box>
      ))}
      <ChatForm form={form} handleSendChatMessage={handleSendChatMessage} />
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
