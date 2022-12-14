import { Avatar, Center, Flex, Text } from '@chakra-ui/react'
import { useSubscribeChat } from '@src/feature/chat/hooks/useSubscribeChat/useSubscribeChat'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider/AuthProvider'

export const Chats = () => {
  const { chats, isLoading } = useSubscribeChat()
  const { user: authUser } = useAuthContext()

  return (
    <Flex pt={2} id={'scroll-area'} flexDirection={'column'} flex={1}>
      {isLoading ? (
        <Center h={'full'} flex={1}>
          <Text>読み込み中...</Text>
        </Center>
      ) : chats.length <= 0 ? (
        <Center h={'full'} flex={1} flexDirection={'column'}>
          <Text>まだチャットが存在しません。</Text>
          <Text>最初のチャットをしてみませんか 🌱</Text>
        </Center>
      ) : (
        chats.map(({ message, user, key }, index) => (
          <Flex
            py={1}
            px={2}
            flexShrink={0}
            alignItems={'start'}
            key={`Chats_${message}_${key}_${index}`}
            flexDirection={authUser?.uid === user.uid ? 'row-reverse' : 'row'}
          >
            <Avatar name={user.name} w={'40px'} h={'40px'} flexShrink={0} />
            <Text
              bgColor={'gray.100'}
              w={'fit-content'}
              rounded={'4px'}
              py={1}
              px={2}
              ml={authUser?.uid === user.uid ? 0 : 2}
              mr={authUser?.uid === user.uid ? 2 : 0}
              fontSize={'14px'}
              fontWeight={'medium'}
              whiteSpace={'pre-line'}
            >
              {message}
            </Text>
          </Flex>
        ))
      )}
    </Flex>
  )
}
