import type { NextPageWithLayout } from '@src/pages/_app.page'
import { BaseLayout } from '@src/layout/BaseLayout/BaseLayout'
import { AuthGuard } from '@src/feature/auth/component/AuthGuard/AuthGuard'
import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import { useSubscribeChat } from '@src/feature/chat/hooks/useSubscribeChat/useSubscribeChat'
import { useCreateChatMessageForm } from '@src/feature/chat/component/CreateChatMessageForm/useCreateChatMessageForm'
import { footerHeight } from '@src/layout/Footer/Footer'
import { headerHeight } from '@src/layout/Header/Header'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider/AuthProvider'

const Page: NextPageWithLayout = () => {
  const { chats } = useSubscribeChat()
  const { renderCreateChatMessageForm } = useCreateChatMessageForm()
  const authUser = useAuthContext()

  return (
    <Box pb={14} pos={'relative'}>
      <Flex
        height={`calc(100vh - ${headerHeight} - ${footerHeight} - ${14 * 4}px)`}
        overflowY={'auto'}
        flexDirection={'column'}
        mx={-4}
      >
        {chats.map(({ message, user, key }, index) => (
          <Flex
            py={1}
            px={2}
            flexShrink={0}
            alignItems={'start'}
            key={`${message}_${key}_${index}`}
            flexDirection={authUser?.uid === user.uid ? 'row-reverse' : 'row'}
          >
            <Avatar name={user.name} w={'40px'} h={'40px'} flexShrink={0} />
            <Text
              bgColor={'gray.100'}
              w={'full'}
              rounded={'4px'}
              py={1}
              px={2}
              ml={authUser?.uid === user.uid ? 0 : 2}
              mr={authUser?.uid === user.uid ? 2 : 0}
              fontSize={'14px'}
              fontWeight={'medium'}
            >
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
