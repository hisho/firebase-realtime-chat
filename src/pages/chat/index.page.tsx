import type { NextPageWithLayout } from '@src/pages/_app.page'
import { BaseLayout } from '@src/layout/BaseLayout/BaseLayout'
import { AuthGuard } from '@src/feature/auth/component/AuthGuard/AuthGuard'
import { Box } from '@chakra-ui/react'
import { useSubscribeChat } from '@src/feature/chat/hooks/useSubscribeChat/useSubscribeChat'
import { useCreateChatMessageForm } from '@src/feature/chat/component/CreateChatMessageForm/useCreateChatMessageForm'

const Page: NextPageWithLayout = () => {
  const { chats } = useSubscribeChat()
  const { renderCreateChatMessageForm } = useCreateChatMessageForm()

  return (
    <div>
      {chats.map(({ message, key }, index) => (
        <Box key={`${message}_${key}_${index}`}>{message}</Box>
      ))}
      {renderCreateChatMessageForm()}
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
