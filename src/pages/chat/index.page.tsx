import type { NextPageWithLayout } from '@src/pages/_app.page'
import { BaseLayout } from '@src/layout/BaseLayout/BaseLayout'
import { AuthGuard } from '@src/feature/auth/component/AuthGuard/AuthGuard'
import { Box } from '@chakra-ui/react'
import { useCreateChatMessageForm } from '@src/feature/chat/component/CreateChatMessageForm/useCreateChatMessageForm'
import { Chats } from '@src/feature/chat/component/Chats/Chats'

const Page: NextPageWithLayout = () => {
  const { renderCreateChatMessageForm } = useCreateChatMessageForm({
    onCompleted: () => {
      const scrollArea = document.getElementById('scroll-area')
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight
      }
    },
  })

  return (
    <Box pb={'120px'} pos={'relative'}>
      <Box mx={-4}>
        <Chats />
      </Box>
      <Box pos={'absolute'} insetX={-2} bottom={2}>
        {renderCreateChatMessageForm()}
      </Box>
    </Box>
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
