import type { NextPageWithLayout } from '@src/pages/_app.page'
import { BaseLayout } from '@src/layout/BaseLayout/BaseLayout'
import { AuthGuard } from '@src/feature/auth/component/AuthGuard/AuthGuard'
import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import { useSubscribeChat } from '@src/feature/chat/hooks/useSubscribeChat/useSubscribeChat'
import { useCreateChatMessageForm } from '@src/feature/chat/component/CreateChatMessageForm/useCreateChatMessageForm'
import { footerHeight } from '@src/layout/Footer/Footer'
import { headerHeight } from '@src/layout/Header/Header'

const Page: NextPageWithLayout = () => {
  const { chats } = useSubscribeChat()
  const { renderCreateChatMessageForm } = useCreateChatMessageForm()

  return (
    <Box pb={14} pos={'relative'}>
      <Flex
        height={`calc(100vh - ${headerHeight} - ${footerHeight} - ${14 * 4}px)`}
        overflowY={'auto'}
        flexDirection={'column'}
        gap={1}
        mx={-4}
      >
        {chats.map(({ message, user, key }, index) => (
          <Flex
            py={1}
            px={4}
            _odd={{ bgColor: 'gray.100' }}
            key={`${message}_${key}_${index}`}
            alignItems={'center'}
          >
            <Avatar name={user.name} size={'md'} />
            <Text ml={2} fontSize={'14px'} fontWeight={'medium'}>
              {message}
            </Text>
          </Flex>
        ))}
      </Flex>
      <Box pos={'absolute'} insetX={'0'} bottom={2}>
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
